import pdfMake from 'pdfmake-calibri/build/pdfmake';
import pdfFonts from 'pdfmake-calibri/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
    calibri: {
        normal: 'calibri.ttf',
        bold: 'calibrib.ttf',
        italics: 'calibrii.ttf',
        bolditalics: 'calibriz.ttf',
    },
};

export const getDataUrl = async (docDefinition = {}) => {
    return new Promise((resoleve, reject) => {
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.getDataUrl(dataUrl => {
            resoleve(dataUrl);
        });
    });
};
