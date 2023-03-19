import React from "react";
import "../css/itemSlider.css"

class ItemSlider extends React.Component {
    constructor(props) {
        super(props)
        this.sliderRef = React.createRef()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentItem !== this.props.currentItem) {
            const itemWidth = 59 + 6; // Largeur d'un élément + espacement
            const sliderWidth = this.sliderRef.current.clientWidth;
            const centerOffset = (sliderWidth - itemWidth) / 2;
            const scrollLeft = itemWidth * this.props.currentItem - centerOffset;
            this.sliderRef.current.style.left = scrollLeft;
            console.log(this.sliderRef.current.style)  
        }
    }

    render() {
        let itimgs = []
        this.props.items.forEach((item, index) => {
            const classNames = ["sliderpic"]
            if (index === this.props.currentItem) {
                classNames.push("currentItem")
            }
            itimgs.push(<img key={item.id} alt={item.id} title={item.name} className={classNames.join(" ")} src={item.image} onClick={this.props.onClick}/>)
        });

        return (
            <div id="slider">
                <div id="sliderinside" ref={this.sliderRef}>
                    {itimgs}
                </div>
                
            </div>
        )
    }
}

export default ItemSlider