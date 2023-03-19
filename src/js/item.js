export default class Item {
    id
    name
    sub
    quality
    stats
    effects
    pool
    type
    charge
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

}
