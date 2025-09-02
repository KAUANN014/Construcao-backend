function calcularMediaAluno(a1, a2, a3) {
    if (a1 === undefined || a2 === undefined) {
        throw new Error("Notas a1 ou a2 não informadas");
    }
    if (a1 < 0 || a2 < 0) {
        throw new Error("Notas a1 ou a2 não podem ser negativas");
    }
    if (a3 !== undefined && a3 < 0) {
        throw new Error("Nota a3 não pode ser negativa");
    }

    let media;
    if (a3 === undefined) {
        media = a1 * 0.4 + a2 * 0.6;
    } else {
        const mediaA1A3 = a1 * 0.6 + a3 * 0.4;
        const mediaA2A3 = a2 * 0.4 + a3 * 0.6;

        media = Math.max(mediaA1A3, mediaA2A3);
    }

    return media;
}

module.exports = { calcularMediaAluno };
