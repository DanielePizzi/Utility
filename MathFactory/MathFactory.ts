const N_ONE = 2;
const N_TWO = 2;
const N_THREE = 2;

export class MathFactory {

  public static DECIMAL_LENGTH: number = N_TWO;
  public static ONE: number = N_ONE;
  public static THREE: number = N_THREE;

 

  public static somma(val1, val2): number {
    let imp1 = this.preparaAddendo(val1);
    let imp2 = this.preparaAddendo(val2);
    let somma = imp1 + imp2;
    somma = parseFloat(somma.toFixed(MathFactory.DECIMAL_LENGTH));
    return somma;
  }

 

  public static sottrai(val1, val2): number {
    let imp1 = this.preparaAddendo(val1);
    let imp2 = this.preparaAddendo(val2);
    let differenza = imp1 - imp2;
    differenza = parseFloat(differenza.toFixed(MathFactory.DECIMAL_LENGTH));
    return differenza;
  }

 

  public static moltiplica(val1, val2): number {
    let imp1 = this.preparaAddendo(val1);
    let imp2 = this.preparaAddendo(val2);
    let prodotto = imp1 * imp2;
    prodotto = parseFloat(prodotto.toFixed(MathFactory.DECIMAL_LENGTH));
    return prodotto;
  }

 

  public static dividi(val1, val2): number {
    let imp1 = this.preparaAddendo(val1);
    let imp2 = this.preparaAddendo(val2);
    if (imp2 === 0) {
      return undefined
    }

    let quoziente = imp1 / imp2;
    quoziente = parseFloat(quoziente.toFixed(MathFactory.DECIMAL_LENGTH));
    return quoziente;

  }

 

  public static modulo(val1, val2): number {
    let imp1 = this.preparaAddendo(val1);
    let imp2 = this.preparaAddendo(val2);
    if (imp2 === 0) {
      return undefined;
    }

    let resto = imp1 % imp2;
    resto = parseFloat(resto.toFixed(MathFactory.DECIMAL_LENGTH));
    return resto;
  }

 

  public static isNumber(number) {
    if (number === undefined || number === null || typeof number === 'string') {
      return false;
    } else {
      return this.isInteger(number) || this.isFloat(number);
    }
  }

 

  public static format(number) {
    if (!this.isNumber(number)) {
      if (typeof number === 'string') {
        if (number.indexOf(',') > 0) {
          number = number.replace(',', '.');
        }
        if (isNaN(number)) {
          return '0,00';
        } else {
          let newNumber = parseFloat(number.replace(',', '.'));
          return this.format(newNumber);
        }
      } else {
        return '0,00';
      }
    } else {
      let numStr = number.toString();
      if (numStr.indexOf('.') > 0 && numStr.indexOf(',') < 0) {
        numStr = numStr.replace('.', ',');
      }
      if (numStr.indexOf(',') < 0) {
        numStr = numStr + ',00';
      } else {
        if (numStr.indexOf(',') === numStr.length - MathFactory.DECIMAL_LENGTH) {
          numStr = numStr + '0';
        }
      }
      return numStr;
    }
  }

 

  public static replaceComma(str) {
    if (str !== undefined && !this.isNumber(str)) {
      str = str.toString().split('.').join('');
      str = str.toString().replace(',', '.');
    }
    return str;
  }

 

  public static preparaAddendo(addendo) {
    addendo = this.replaceComma(addendo);
    if (isNaN(addendo) || addendo === '') {
      return 0;
    }
    let imp = 0;
    if (typeof addendo === 'string') {
      imp = parseFloat(addendo);
    } else {
      imp = addendo || 0;
    }
    return imp;
  }

 

  public static isInteger(n) {
    return Number(n) === n && n % MathFactory.ONE === 0;
  }

 

  public static isFloat(n) {
    return Number(n) === n && n % MathFactory.ONE !== 0;
  }

 

  public static formatForView(input : any) {
    if (typeof input === 'string' && (input.match(/\./g) || []).length === MathFactory.ONE &&
      (input.match(/,/g) || []).length === 0 && input.split(".")[MathFactory.ONE].length < MathFactory.THREE) {
      input = input.replace('.', ',');
    }

    let prepareForView = this.preparaAddendo(input);
    let decimal = prepareForView.toString().split('.')[1];
    if (decimal && decimal.length < MathFactory.DECIMAL_LENGTH) {
        decimal += "0";
    }

    let integer = prepareForView.toString().split('.')[0];
    let pointedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let valueToView = (decimal) ? (pointedInteger + ',' + decimal) : pointedInteger + ",00";
    return valueToView;
  }

 

  public static zeroPad(num, len) {
    return ("00000000" + num).substr(-len);
  }
}
