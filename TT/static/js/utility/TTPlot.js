class TTplot {
    constructor(canvas, tic_spacing, background_color) {
        this.context = canvas.getContext('2d')
        this.canvas = canvas

        this.resize_canvas_to_display_size()
        this.set_background_color(background_color)

        this.tic_spacing = tic_spacing
    }

    resize_canvas_to_display_size = () => {
        // look up the size the canvas is being displayed
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        // If it's resolution does not match change it
        if (this.canvas.width !== width || this.canvas.height !== height) {
            this.canvas.width = width;
            this.canvas.height = height;
            this.width = width
            this.height = height
            return true;
        }

        return false;
    }

    set_background_color = (color) => {
        this.context.fillStyle = color
        this.context.fillRect(0, 0, this.width, this.height)
    }

    draw_2d_axes = (center_x, center_y, line_width, color) => {
        center_y = this.height - center_y

        this.context.lineWidth = line_width
        this.context.strokeStyle = color
        this.context.moveTo(0, center_y)
        this.context.lineTo(this.width, center_y)
        this.context.stroke()
        this.context.moveTo(center_x, 0)
        this.context.lineTo(center_x, this.height)
        this.context.stroke()

        this.context.lineWidth = line_width / 2

        this.context.beginPath()

        let tic_size = Math.min(this.height, this.width) / 40
        let x = center_x + this.tic_spacing
        let y = center_y
        while(x <= this.width) {
            this.context.moveTo(x + 0.5, y - tic_size)
            this.context.lineTo(x + 0.5, y + tic_size)
            this.context.stroke()
            x += this.tic_spacing
        }

        x = center_x - this.tic_spacing
        while(x >= 0) {
            this.context.moveTo(x + 0.5, y - tic_size)
            this.context.lineTo(x + 0.5, y + tic_size)
            this.context.stroke()
            x -= this.tic_spacing
        }

        x = center_x
        y = center_y + this.tic_spacing
        while(y <= this.height) {
            this.context.moveTo(x - tic_size, y + 0.5)
            this.context.lineTo(x + tic_size, y + 0.5)
            this.context.stroke()
            y += this.tic_spacing
        }

        y = center_y - this.tic_spacing
        while(y >= 0) {
            this.context.moveTo(x - tic_size, y + 0.5)
            this.context.lineTo(x + tic_size, y + 0.5)
            this.context.stroke()
            y -= this.tic_spacing
        }
    }

    canvas_arrow = (fromx, fromy, tox, toy, line_width, color, label, label_color) => {
        tox *= this.tic_spacing
        toy *= this.tic_spacing
        fromy = this.height - fromy
        let x_center = fromx + tox
        let y_center = fromy - toy

        this.context.strokeStyle = color
        this.context.fillStyle = color
        this.context.lineWidth = line_width

        let r = line_width * 1.8

        let angle = Math.atan2(-toy, tox)
        let point_x = r*Math.cos(angle) + x_center
        let point_y = r*Math.sin(angle) + y_center

        angle += (1/3)*(2*Math.PI)
        let back_point_1x = r*Math.cos(angle) + x_center
        let back_point_1y = r*Math.sin(angle) + y_center

        angle += (1/3)*(2*Math.PI)
        let back_point_2x = r*Math.cos(angle) + x_center
        let back_point_2y = r*Math.sin(angle) + y_center

        this.context.beginPath()
        this.context.moveTo(fromx, fromy)
        this.context.lineTo((back_point_1x + back_point_2x) * 0.5, (back_point_1y + back_point_2y) * 0.5)
        this.context.stroke()
        this.context.moveTo(point_x, point_y)
        this.context.lineTo(back_point_1x, back_point_1y)
        this.context.lineTo(back_point_2x, back_point_2y)
        this.context.closePath()
        this.context.fill()

        if (!!label) {
            let text_x = fromx + (1.2 * tox)
            let text_y = fromy - (1.2 * toy)
            this.context.fillStyle = label_color
            this.context.font = 10 * line_width + "px MathJax_Math"
            this.context.fillText(label, text_x, text_y)
        }
    }
}
