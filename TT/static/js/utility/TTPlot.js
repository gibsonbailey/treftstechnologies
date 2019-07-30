class TTplot {
    constructor(canvas, tic_spacing, background_color) {
        this.context = canvas.getContext('2d')
        this.canvas = canvas
        this.resize_canvas_to_display_size()
        this.background_color = background_color
        this.draw_background()

        let that = this
        this.x_labels = false
        this.y_labels = false
        this.canvas.addEventListener('mousemove', function (e) {
            let cursor_x = e.offsetX
            let cursor_y = that.height - e.offsetY
            if(!!that.axes_config) {
                let window_margin = 4
                if(cursor_x >= that.axes_config.origin.x - (that.axes_config.line_width * window_margin) && cursor_x <= that.axes_config.origin.x + (that.axes_config.line_width * window_margin)) {
                    that.y_labels = true
                } else {
                    that.y_labels = false
                }

                if(cursor_y >= that.axes_config.origin.y - (that.axes_config.line_width * window_margin) && cursor_y <= that.axes_config.origin.y + (that.axes_config.line_width * window_margin)) {
                    that.x_labels = true
                } else {
                    that.x_labels = false
                }
                that.clear()
                that.draw_background()
                that.draw_2d_axes()

                if(!!that.arrows) {
                    that.draw_arrows()
                }

                if(!!that.array) {
                    that.plot_array()
                }

                if(!!that.func) {
                    that.plot_func()
                }

                if(!!that.extra_draw_func) {
                    that.extra_draw_func(that, cursor_x, e.offsetY)
                }
            }
        })
        this.tic_spacing = tic_spacing
    }

    set_array = (array, options) => {
        this.array = array
        this.array_opts = options
        this.plot_array()
    }

    plot_array = () => {
        this.context.strokeStyle = this.array_opts.color
        this.context.lineWidth = this.array_opts.line_width

        this.context.beginPath()
        for (let i = 0; i < this.array.length; i++) {
            let point = this.grid_to_canvas_space(this.array[i].x, this.array[i].y)
            if (i == 0) {
                this.context.moveTo(point.x, point.y)
            } else {
                this.context.lineTo(point.x, point.y)
            }
        }
        this.context.stroke()
    }

    set_func = (func, options) => {
        this.func = func
        this.func_opts = options
        this.plot_func()
    }

    plot_func = () => {
        this.context.strokeStyle = this.func_opts.color
        this.context.lineWidth = this.func_opts.line_width

        this.context.beginPath()
        let initial_canvas = this.canvas_to_grid_space(0, 0)
        let initial_position = this.grid_to_canvas_space(initial_canvas.x, this.func(initial_canvas.x))
        this.context.moveTo(initial_position.x, initial_position.y)
        for (let x = 0; x < this.width; x += this.func_opts.res) {
            let input = this.canvas_to_grid_space(x, 0)
            let output = this.grid_to_canvas_space(input.x, this.func(input.x))
            this.context.lineTo(output.x, output.y)
        }
        this.context.stroke()
    }

    canvas_to_grid_space = (x, y) => {
        y = (y - (this.height - this.axes_config.origin.y)) / this.tic_spacing
        x = (x - this.axes_config.origin.x) / this.tic_spacing
        return {x: x, y: y}
    }

    grid_to_canvas_space = (x, y) => {
        y = this.height - this.axes_config.origin.y - (y * this.tic_spacing)
        x = this.axes_config.origin.x + (x * this.tic_spacing)
        return {x: x, y: y}
    }

    clear = () => {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    resize_canvas_to_display_size = () => {
        // look up the size the canvas is being displayed
        const width = this.canvas.clientWidth;
        const height = this.canvas.clientHeight;

        this.dpr = window.devicePixelRatio || 1

        this.canvas.width = width * this.dpr;
        this.canvas.height = height * this.dpr;
        this.width = width
        this.height = height

        this.context.scale(this.dpr, this.dpr)
    }

    draw_background = () => {
        this.context.fillStyle = this.background_color
        this.context.fillRect(0, 0, this.width, this.height)
    }

    axes = (config) => {
        this.axes_config = config
        this.draw_2d_axes()
    }

    set_arrows = (arrows) => {
        this.arrows = arrows
        this.draw_arrows()
    }

    draw_2d_axes = () => {
        let center_x = this.axes_config.origin.x
        let center_y = this.axes_config.origin.y
        let line_width = this.axes_config.line_width
        let color = this.axes_config.color

        this.context.fillStyle = 'white'
        this.context.font = 10 * line_width + "px MathJax_Math"

        center_y = this.height - center_y

        this.context.lineWidth = line_width
        this.context.strokeStyle = color

        this.context.beginPath()

        this.context.moveTo(0, center_y)
        this.context.lineTo(this.width, center_y)
        this.context.stroke()
        this.context.moveTo(center_x, 0)
        this.context.lineTo(center_x, this.height)
        this.context.stroke()

        this.context.lineWidth = line_width / 2

        this.context.beginPath()

        let tic_size = Math.min(this.height, this.width) / 60
        let x_label = 1
        let x = center_x + this.tic_spacing
        let y = center_y
        while(x <= this.width) {
            if (this.axes_config.grid) {
                this.context.moveTo(x + 0.5, 0)
                this.context.lineTo(x + 0.5, this.height)
            } else {
                this.context.moveTo(x + 0.5, y - tic_size)
                this.context.lineTo(x + 0.5, y + tic_size)
            }
            this.context.stroke()
            if(this.x_labels) {
                this.context.fillText(x_label, x + 0.5, y + (tic_size * 2))
            }
            x += this.tic_spacing
            x_label += 1
        }

        x_label = -1
        x = center_x - this.tic_spacing
        while(x >= 0) {
            if (this.axes_config.grid) {
                this.context.moveTo(x + 0.5, 0)
                this.context.lineTo(x + 0.5, this.height)
            } else {
                this.context.moveTo(x + 0.5, y - tic_size)
                this.context.lineTo(x + 0.5, y + tic_size)
            }
            this.context.stroke()
            if(this.x_labels) {
                this.context.fillText(x_label, x + 0.5, y + (tic_size * 2))
            }
            x -= this.tic_spacing
            x_label -= 1
        }

        let y_label = -1
        x = center_x
        y = center_y + this.tic_spacing
        while(y <= this.height) {
            if (this.axes_config.grid) {
                this.context.moveTo(0, y + 0.5)
                this.context.lineTo(this.width, y + 0.5)
            } else {
                this.context.moveTo(x - tic_size, y + 0.5)
                this.context.lineTo(x + tic_size, y + 0.5)
            }
            this.context.stroke()
            if(this.y_labels) {
                this.context.fillText(y_label, x + tic_size, y + 0.5)
            }
            y += this.tic_spacing
            y_label -= 1
        }

        y_label = 1
        y = center_y - this.tic_spacing
        while(y >= 0) {
            if (this.axes_config.grid) {
                this.context.moveTo(0, y + 0.5)
                this.context.lineTo(this.width, y + 0.5)
            } else {
                this.context.moveTo(x - tic_size, y + 0.5)
                this.context.lineTo(x + tic_size, y + 0.5)
            }
            this.context.stroke()
            if(this.y_labels) {
                this.context.fillText(y_label, x + tic_size, y + 0.5)
            }
            y -= this.tic_spacing
            y_label += 1
        }
    }

    draw_arrows = () => {
        for (let i = 0; i < this.arrows.length; i++) {
//            let fromx = this.axes_config.origin.x + (this.arrows[i].start_point.x * this.tic_spacing)
//            let fromy = this.axes_config.origin.y - (this.arrows[i].start_point.y * this.tic_spacing)
//            let tox = this.arrows[i].delta.x
//            let toy = this.arrows[i].delta.y
//            let line_width = this.arrows[i].line_width
//            let color = this.arrows[i].color
//            let label = this.arrows[i].label

            this.draw_arrow(this.arrows[i].start_point.x, this.arrows[i].start_point.y, this.arrows[i].delta.x, this.arrows[i].delta.y, this.arrows[i].line_width, this.arrows[i].color, this.arrows[i].label)
        }
    }

    draw_arrow = (fromx, fromy, tox, toy, line_width, color, label) => {
        fromx = this.axes_config.origin.x + (fromx * this.tic_spacing)
        fromy = this.axes_config.origin.y - (fromy * this.tic_spacing)
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
            this.context.fillStyle = label.color
            this.context.font = 10 * line_width + "px MathJax_Math"
            this.context.fillText(label.text, text_x, text_y)
        }
    }
    set_extra_draw_func = (func) => {
        this.extra_draw_func = func
    }
}
