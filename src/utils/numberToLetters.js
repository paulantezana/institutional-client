let cUnidades = [
    '',
    'Un',
    'Dos',
    'Tres',
    'Cuatro',
    'Cinco',
    'Seis',
    'Siete',
    'Ocho',
    'Nueve',
    'Diez',
    'Once',
    'Doce',
    'Trece',
    'Catorce',
    'Quince',
    'Dieciseis',
    'Diecisite',
    'Dieciocho',
    'Diecinueve',
    'Veinte',
    'Veintiuno',
    'Veintidós',
    'Veintitrés',
    'Veitnicuatro',
    'Veinticinco',
    'Veintiseis',
    'Veintisiete',
    'Veintiocho',
    'Veintinueve',
];
let cDecenas = [
    '',
    'Diez',
    'Veinte',
    'Treinta',
    'Cuarenta',
    'Cincuenta',
    'Sesenta',
    'Setenta',
    'Ochenta',
    'Noventa',
    'Cien',
];
let cCentenas = [
    '',
    'Ciento',
    'Doscientos',
    'Trescientos',
    'Cuatrocientos',
    'Quinientos',
    'Seiscientos',
    'Setecientos',
    'Ochocientos',
    'Novecientos',
];

export default function numberToLetters(num) {
    let nMillones = Math.trunc(num / 1000000);
    let nMiles = Math.trunc((num / 1000) % 1000);
    let nCentenas = Math.trunc((num / 100) % 10);
    let nDecenas = Math.trunc((num / 10) % 10);
    let nUnidades = Math.trunc(num % 10);

    let text = '';

    // Evaluacion de los millones
    if (nMillones == 1) {
        text = 'Un Millón' + (num % 1000000 != 0 ? ' ' + numberToLetters(num % 1000000) : '');
        return text;
    } else if (nMillones >= 2 && nMillones <= 999) {
        text =
            numberToLetters(Math.trunc(num / 1000000)) +
            ' Millones' +
            (num % 1000000 != 0 ? ' ' + numberToLetters(num % 1000000) : '');
        return text;
    }

    // Evaluacion de miles
    if (nMiles == 1) {
        text = 'Mil' + (num % 1000 != 0 ? ' ' + numberToLetters(num % 1000) : '');
        return text;
    } else if (nMiles >= 2 && nMiles <= 999) {
        text =
            numberToLetters(Math.trunc(num / 1000)) +
            ' Mil' +
            (num % 1000 != 0 ? ' ' + numberToLetters(num % 1000) : '');
        return text;
    }

    // Evaluación desde 0 a 999
    // Casos Especiales
    if (num == 100) {
        text = cDecenas[10];
        return text;
    } else if (num == 0) {
        text = 'Cero';
        return text;
    }

    // nCentenas
    if (nCentenas != 0) {
        text = cCentenas[nCentenas];
    }

    // nDecenas
    if (nDecenas != 0) {
        if (nDecenas == 1 || nDecenas == 2) {
            if (nCentenas != 0) {
                text += ' ';
            }
            text += cUnidades[num % 100];
            return text;
        } else {
            if (nCentenas != 0) {
                text += ' ';
            }
            text += cDecenas[nDecenas];
        }
    }

    // nUnidades
    if (nUnidades != 0) {
        if (nDecenas != 0) {
            text += ' y ';
        } else if (nCentenas != 0) {
            text += ' ';
        }
        text += cUnidades[nUnidades];
    }

    return text;
}
