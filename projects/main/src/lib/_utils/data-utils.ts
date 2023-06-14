export class DataUtils {
    static addZero(val: any, length: number): string {
        const valLength = val.toString().length;
        if (valLength < length) {
            const zeroCount = length - valLength;
            let zero = '';
            for (let i = 0; i < zeroCount; i++) {
                zero += '0';
            }
            return `${zero}${val}`;
        }
        return val.toString();
    }

    static numberWithSeparator(val: any) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `,`);
    }

    static separatorValueToNumber(val: string) {
        return Number(val.toString().replace(/,/g, ''));
    }

    static formatToBalance(val: any, separator: '-' | '_', separateNumber?: number): string {
        separateNumber = separateNumber ? separateNumber : 4;
        // 20000000000002
        const value = val.toString();
        let result = '';
        let j = 1;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < value.length; i++) {
            if (i > (separateNumber * (j)) - 1) {
                result += separator;
                j++;
            }
            result += value[i];
        }
        return result;
    }
}
