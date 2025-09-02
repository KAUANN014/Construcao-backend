const { calcularMediaAluno } = require('../src/calcularMediaAluno');

test('verifica se a função calcularMediaAluno está definida', () => {
    expect(calcularMediaAluno).toBeDefined();
});

test('lança erro se a1 ou a2 forem indefinidos', () => {
    expect(() => calcularMediaAluno(undefined, 5)).toThrow('Notas a1 ou a2 não informadas');
    expect(() => calcularMediaAluno(8, undefined)).toThrow('Notas a1 ou a2 não informadas');
});

describe('calcularMediaAluno', () => {
    test('deve lançar erro se a1 for undefined', () => {
        expect(() => calcularMediaAluno(undefined, 8)).toThrow('Notas a1 ou a2 não informadas');
    });

    test('deve lançar erro se a2 for undefined', () => {
        expect(() => calcularMediaAluno(7, undefined)).toThrow('Notas a1 ou a2 não informadas');
    });

    test('deve lançar erro se a1 e a2 forem undefined', () => {
        expect(() => calcularMediaAluno(undefined, undefined)).toThrow('Notas a1 ou a2 não informadas');
    });

    test('lança erro quando a1 é negativo', () => {
        expect(() => calcularMediaAluno(-5, 8)).toThrow('Notas a1 ou a2 não podem ser negativas');
    });

    test('lança erro quando a2 é negativo', () => {
        expect(() => calcularMediaAluno(7, -3)).toThrow('Notas a1 ou a2 não podem ser negativas');
    });

    test('lança erro quando ambas as notas são negativas', () => {
        expect(() => calcularMediaAluno(-2, -4)).toThrow('Notas a1 ou a2 não podem ser negativas');
    });

    test('calcula a média normalmente quando a3 não é informada', () => {
        const a1 = 7;
        const a2 = 9;
        const resultado = calcularMediaAluno(a1, a2);
        expect(resultado).toBeCloseTo(a1 * 0.4 + a2 * 0.6);
    });

    test('lança erro quando a3 é negativa', () => {
        const a1 = 7;
        const a2 = 8;
        const a3 = -5;
        expect(() => calcularMediaAluno(a1, a2, a3)).toThrow('Nota a3 não pode ser negativa');
    });

    test('verifica a melhor combinação quando a3 é informada', () => {
        const a1 = 8;
        const a2 = 7;
        const a3 = 9;
        const resultado = calcularMediaAluno(a1, a2, a3);
        const mediaEsperada = Math.max(a1 * 0.6 + a3 * 0.4, a2 * 0.4 + a3 * 0.6);
        expect(resultado).toBeCloseTo(mediaEsperada, 2);
    });

    test('verifica a melhor combinação quando a3 é informada e a3 é combinada com a2', () => {
        const a1 = 8;
        const a2 = 7;
        const a3 = 9;
        const resultado = calcularMediaAluno(a1, a2, a3);
        const mediaEsperada = Math.max(a1 * 0.6 + a3 * 0.4, a2 * 0.4 + a3 * 0.6);
        expect(resultado).toBeCloseTo(mediaEsperada, 2);
    });
});
