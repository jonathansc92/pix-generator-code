export default class PixGeneratorCode {
    constructor({pixKey, merchantName, merchantCity, description = '', amount = 0, txid = '***'}) {
        this.pixKey = pixKey;
        this.description = this._removeSpecialChars(description);
        this.merchantName = this._removeSpecialChars(merchantName);
        this.merchantCity = this._removeSpecialChars(merchantCity);
        this.txid = txid || this._generateTXID();
        this.amount = amount > 0 ? amount.toFixed(2) : null;
  
        this.ID_PAYLOAD_FORMAT_INDICATOR = "00";
        this.ID_MERCHANT_ACCOUNT_INFORMATION = "26";
        this.ID_MERCHANT_ACCOUNT_INFORMATION_GUI = "00";
        this.ID_MERCHANT_ACCOUNT_INFORMATION_KEY = "01";
        this.ID_MERCHANT_CATEGORY_CODE = "52";
        this.ID_TRANSACTION_CURRENCY = "53";
        this.ID_TRANSACTION_AMOUNT = "54";
        this.ID_COUNTRY_CODE = "58";
        this.ID_MERCHANT_NAME = "59";
        this.ID_MERCHANT_CITY = "60";
        this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE = "62";
        this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID = "05";
        this.ID_CRC16 = "63";
    }
  
    _getValue(id, value) {
        const size = String(value.length).padStart(2, "0");
        return id + size + value;
    }
  
    _getMerchantAccountInfo() {
        const gui = this._getValue(this.ID_MERCHANT_ACCOUNT_INFORMATION_GUI, "BR.GOV.BCB.PIX");
        const key = this._getValue(this.ID_MERCHANT_ACCOUNT_INFORMATION_KEY, this.pixKey);
        return this._getValue(this.ID_MERCHANT_ACCOUNT_INFORMATION, gui + key);
    }
  
    _getAdditionalDataFieldTemplate() {
        const txid = this._getValue(this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_TXID, this.txid);
        return this._getValue(this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE, txid);
    }
  
    getPayload() {
        let payload = this._getValue(this.ID_PAYLOAD_FORMAT_INDICATOR, "01") +
            this._getMerchantAccountInfo() +
            this._getValue(this.ID_MERCHANT_CATEGORY_CODE, "0000") +
            this._getValue(this.ID_TRANSACTION_CURRENCY, "986");
  
        if (this.amount) {
            payload += this._getValue(this.ID_TRANSACTION_AMOUNT, this.amount);
        }
  
        payload += this._getValue(this.ID_COUNTRY_CODE, "BR");
  
        if (this.merchantName) {
            payload += this._getValue(this.ID_MERCHANT_NAME, this.merchantName);
        }
        if (this.merchantCity) {
            payload += this._getValue(this.ID_MERCHANT_CITY, this.merchantCity);
        }
  
        payload += this._getAdditionalDataFieldTemplate();
  
        return payload + this._getCRC16(payload);
    }
  
    _generateTXID() {
        const length = 25;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let txid = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            txid += characters[randomIndex];
        }
        return txid;
    }
  
    _getCRC16(payload) {
        function ord(str) {
            return str.charCodeAt(0);
        }
        function dechex(number) {
            if (number < 0) {
                 number = 0xffffffff + number + 1;
            }
            return parseInt(number, 10).toString(16);
        }
  
        payload = payload + this.ID_CRC16 + "04";
        let polinomio = 0x1021;
        let resultado = 0xffff;
  
        for (let offset = 0; offset < payload.length; offset++) {
            resultado ^= ord(payload[offset]) << 8;
            for (let bitwise = 0; bitwise < 8; bitwise++) {
                if ((resultado <<= 1) & 0x10000) resultado ^= polinomio;
                resultado &= 0xffff;
            }
        }
  
        return this.ID_CRC16 + "04" + dechex(resultado).toUpperCase();
      }
  
    _removeSpecialChars = (str) => {
        return str.normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9 ]/g, '')
            .trim()
            .toUpperCase();
    };
}