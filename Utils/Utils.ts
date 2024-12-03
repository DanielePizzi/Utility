export class Utils {
  
   public static getUrlParams(param:string){
        let params = new HttpParams({ fromString: window.location.search });
        let paramValue = params.get("?"+param) == null ? params.get(param) : params.get("?"+param);
        return paramValue;
    }

    /**
     * Copia i valori di tutte le proprietà proprie enumerabili da uno o più oggetti di origine in un
     * oggetto target. Restituisce l'oggetto target.
     * @param target L'oggetto target su cui copiare.
     * @param source L'oggetto di origine da cui copiare le proprietà.
     */

    public static mergeObjects(target: any , ...args: any[]) {
        for(let i of args) {
            let obj = i,
                    keys = Object.keys(obj);
                for(let j of keys) {
                    target[j] = obj[j];
                }
            }
        return target;
    }
}
  
