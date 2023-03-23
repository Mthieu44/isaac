import q0 from '../images/qualities/quality0.png'
import q1 from '../images/qualities/quality1.png'
import q2 from '../images/qualities/quality2.png'
import q3 from '../images/qualities/quality3.png'
import q4 from '../images/qualities/quality4.png'
import itemisaacdle from "../itemsIsaacdle.json"


const qs = [q0, q1, q2, q3, q4]
export default class Item {
    constructor(obj) {
        Object.assign(this,obj)
        this.image = this.getImage()
        this.link = this.getUrl()
        
    }

    getImage() {
        if (this.name === "<3"){return require("../images/items/less_than_three.png")}
        let str = this.name.replace(/\s+/g, '_')
        str = str.toLowerCase();
        str = str.replace(/[^a-z0-9_]/g, '');
        return require("../images/items/" + str + ".png")
    }

    getUrl() {
        if (this.name === "<3"){return "https://bindingofisaacrebirth.fandom.com/wiki/Less_Than_Three"}
        if (this.name === "No item"){return "https://bindingofisaacrebirth.fandom.com/wiki/Items"}
        let str = this.name.replace(/\s+/g, '_')
        str = encodeURIComponent(str)
        return "https://bindingofisaacrebirth.fandom.com/wiki/" + str;
    }

    getQualityImage() {
        return qs[this.quality]
    }

    getIsaacdleStats() {
        let s = []
        for (let [stat, list] of Object.entries(itemisaacdle.stats)) {
            if (list.includes(this.id)){
                s.push(stat)
            }
        }
        return s
    }

    getIsaacdleEffects() {
        let e = []
        for (let [effect, list] of Object.entries(itemisaacdle.effects)) {
            if (list.includes(this.id)){
                e.push(effect)
            }
        }
        return e
    }

}
