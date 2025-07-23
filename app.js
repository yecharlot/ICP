const express = require('express');
const app = express();

// Base de datos temporal (en producción usa PostgreSQL/MongoDB)
const dominios = {
    'usuario1': 'QmXoypiz...',  // CID de IPFS
    'usuario2': 'k51qzi5u...',   // Clave IPNS
};

app.get('*', (req, res) => {
    const subdominio = req.hostname.split('.')[0]; // Extrae 'usuario1' de 'usuario1.docsis.runasp.net'
    const contenidoHash = dominios[subdominio];

    if (contenidoHash) {
        // Redirige al gateway IPFS (público o propio)
        const gateway = 'https://gateway.ipfs.io';
        const rutaIPFS = contenidoHash.startsWith('Qm') ? `/ipfs/${contenidoHash}` : `/ipns/${contenidoHash}`;
        res.redirect(302, `${gateway}${rutaIPFS}`);
    } else {
        res.status(404).send('Subdominio no encontrado');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
