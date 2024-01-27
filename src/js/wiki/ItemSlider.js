import React from "react";
import "../../css/itemSlider.css"

class ItemSlider extends React.Component {
    constructor(props) {
        super(props)
        this.sliderRef = React.createRef()
        this.clicked = false
        this.startX = null
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentItem !== this.props.currentItem) {
            const itemWidth = 59 + 6;
            const sliderWidth = this.sliderRef.current.clientWidth;
            const centerOffset = (sliderWidth - itemWidth) / 2;
            const scrollLeft = itemWidth * this.props.currentItem - centerOffset;
            this.sliderRef.current.scrollLeft = scrollLeft;
        }
    }

    handleMouseDown = (event) => {
        this.clicked = true
        this.sliderRef.current.style.scrollBehavior = "unset"
        this.startX = event.clientX
    }

    handleMouseMove = (event) => {
        if (this.clicked){
            let scrollLeft = this.sliderRef.current.scrollLeft
            scrollLeft -= event.movementX
            this.sliderRef.current.scrollLeft = scrollLeft
        }
    }

    handleMouseUp = (event) => {
        this.clicked = false
        this.sliderRef.current.style.scrollBehavior = "smooth"
        if (this.startX && Math.abs(event.clientX - this.startX) > 5) {
            this.startX = null;
        } else {
            
            this.props.onClick(event)
        }
    }

    handleMouseLeave = () => {
        this.clicked = false
        this.sliderRef.current.style.scrollBehavior = "smooth"
        this.startX = null
    }


    render() {
        let itimgs = []
        this.props.items.forEach((item, index) => {
            const classNames = ["sliderpic"]
            if (index === this.props.currentItem) {
                classNames.push("currentItem")
            }
            itimgs.push(<img 
                key={item.id} 
                alt={item.id} 
                title={item.name} 
                className={classNames.join(" ")} 
                src={item.image} 
                draggable={false}/>)
        });

        return (
            <div id="slider">
                <div id="sliderinside" 
                ref={this.sliderRef} 
                onMouseDown={this.handleMouseDown} 
                onMouseUp={this.handleMouseUp} 
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}>
                    {itimgs}
                </div>
            </div>
        )
    }
}

export default ItemSlider