class Perlin {
    constructor(dimension, frequency, magnitude) {
        this.magnitude = magnitude
        this.frequency = frequency
        this.dimension = dimension
        if (dimension == 1 || dimension == 2) {
            this.grid = this.create_gradient_grid2D(20, 20)
        } else if (dimension == 3) {
            this.grid = this.create_gradient_grid3D(20, 20, 20)
        }
    }

    get_value = (x, y, z) => {
        x *= this.frequency * 0.9
        y *= this.frequency * 0.9
        z *= this.frequency * 0.9

        if (this.dimension == 1) {
            return this.perlin2D(x, 0) * this.magnitude
        } else if (this.dimension == 2) {
            return this.perlin2D(x, y) * this.magnitude
        } else if (this.dimension == 3) {
            return this.perlin3D(x, y, z) * this.magnitude
        }
    }

    mod = (x, y) => {
        return (x % y + y) % y
    }

    lerp = (a, b, w) => {
        return (w * a) + ((1 - w) * b)
    }

    fade = (x) => {
        return (6 * Math.pow(x, 5)) - (15 * Math.pow(x, 4)) + (10 * Math.pow(x, 3))
    }

    smerp = (a, b, w) => {
        return this.lerp(a, b, this.fade(w))
    }

    dot_product = (a, b) => {
        if (a.constructor !== Array) {
            throw "First argument is not an array."
        } else if (b.constructor !== Array) {
            throw "Second argument is not an array."
        } else if (a.length !== b.length) {
            throw "Arrays are not the same length."
        }

        let sum = 0
        for (let i = 0; i < a.length; i++) {
            sum += a[i] * b[i]
        }

        return sum
    }

    create_random_vector = (n, diagonal) => {
        let vec = []
        for(let i = 0; i < n; i++) {
            if (diagonal) {
                let component = 1
                if (Math.random() >= 0.5) {
                    component = -1
                }
                vec.push(component)
            } else {
                vec.push((Math.random() * 2) - 1)
            }
        }

        return vec
    }

    perlin2D  = (x, y) => {
        let x_node = Math.floor(x)
        let y_node = Math.floor(y)
        let dx = x - x_node
        let dy = y - y_node

        // Dot Products
        let ll = this.dot_product([dx, dy], this.grid.data[this.mod(y_node, this.grid.rows)][this.mod(x_node, this.grid.cols)])
        let lu = this.dot_product([dx, (dy - 1)], this.grid.data[this.mod((y_node + 1), this.grid.rows)][this.mod(x_node, this.grid.cols)])
        let ul = this.dot_product([(dx - 1), dy], this.grid.data[this.mod(y_node, this.grid.rows)][this.mod((x_node + 1), this.grid.cols)])
        let uu = this.dot_product([(dx - 1), (dy - 1)], this.grid.data[this.mod((y_node + 1), this.grid.rows)][this.mod((x_node + 1), this.grid.cols)])

        // Smooth Interpolation
        let U = this.smerp(lu, ll, dy)
        let L = this.smerp(uu, ul, dy)
        return this.smerp(L, U, dx)
    }

    perlin3D = (x, y, z) => {
        let x_node = Math.floor(x)
        let y_node = Math.floor(y)
        let z_node = Math.floor(z)
        let dx = x - x_node
        let dy = y - y_node
        let dz = z - z_node

        let lll = this.dot_product([dx, dy, dz], this.grid.data[this.mod(y_node, this.grid.rows)][this.mod(x_node, this.grid.cols)][this.mod(z_node, this.grid.layers)])
        let llu = this.dot_product([dx, dy, (dz - 1)], this.grid.data[this.mod(y_node, this.grid.rows)][this.mod(x_node, this.grid.cols)][this.mod(z_node + 1, this.grid.layers)])
        let lul = this.dot_product([dx, (dy - 1), dz], this.grid.data[this.mod((y_node + 1), this.grid.rows)][this.mod(x_node, this.grid.cols)][this.mod(z_node, this.grid.layers)])
        let luu = this.dot_product([dx, (dy - 1), (dz - 1)], this.grid.data[this.mod((y_node + 1), this.grid.rows)][this.mod(x_node, this.grid.cols)][this.mod(z_node + 1, this.grid.layers)])
        let ull = this.dot_product([(dx - 1), dy, dz], this.grid.data[this.mod(y_node, this.grid.rows)][this.mod((x_node + 1), this.grid.cols)][this.mod(z_node, this.grid.layers)])
        let ulu = this.dot_product([(dx - 1), dy, (dz - 1)], this.grid.data[this.mod(y_node, this.grid.rows)][this.mod((x_node + 1), this.grid.cols)][this.mod(z_node + 1, this.grid.layers)])
        let uul = this.dot_product([(dx - 1), (dy - 1), dz], this.grid.data[this.mod((y_node + 1), this.grid.rows)][this.mod((x_node + 1), this.grid.cols)][this.mod(z_node, this.grid.layers)])
        let uuu = this.dot_product([(dx - 1), (dy - 1), (dz - 1)], this.grid.data[this.mod((y_node + 1), this.grid.rows)][this.mod((x_node + 1), this.grid.cols)][this.mod(z_node + 1, this.grid.layers)])

        let UL = this.smerp(lul, lll, dy)
        let LL = this.smerp(uul, ull, dy)
        let UU = this.smerp(luu, llu, dy)
        let LU = this.smerp(uuu, ulu, dy)

        let L = this.smerp(LL, UL, dx)
        let U = this.smerp(LU, UU, dx)

        return this.smerp(U, L, dz)
    }

    create_gradient_grid3D = (n, m, k) => {
        let dimension = 3

        let grid = {
            rows: n,
            cols: m,
            layers: k,
            data: [],
        }

        for(let i = 0; i < n; i++) {
            let row = []
            for(let j = 0; j < m; j++) {
                let col = []
                for(let q = 0; q < k; q++) {
                    col.push(this.create_random_vector(dimension))
                }
                row.push(col)
            }
            grid.data.push(row)
        }

        return grid
    }

    create_gradient_grid2D = (n,m) => {
        let dimension = 2

        let grid = {
            rows: n,
            cols: m,
            data: [],
        }
        for(let i = 0; i < n; i++) {
            let row = []
            for(let j = 0; j < m; j++) {
                row.push(this.create_random_vector(dimension))
            }
            grid.data.push(row)
        }

        return grid
    }

    create_random_vector = (n) => {
        let vec = []
        for(let i = 0; i < n; i++) {
            let component = 1
            if (Math.random() >= 0.5) {
                component = -1
            }
            vec.push(component)
        }
        return vec
    }
}