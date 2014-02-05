/**
 * Created by Eric on 1/20/14.
 */

function Utils() {
    this.loadFromObject = function (target, obj) {
        for (var name in obj) {
            if (typeof target[name] == 'function')  continue;

            if (typeof target[name] == 'object') {
                this.loadFromObject(target[name], obj[name]);
                continue;
            }
            target[name] = obj[name];
        }
        return target;
    }
}
