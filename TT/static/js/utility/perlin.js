function mod(x, y) {
    return (x % y + y) % y
}

function lerp(a, b, w) {
    return (w * a) + ((1 - w) * b)
}

function fade(x) {
    return (6 * Math.pow(x, 5)) - (15 * Math.pow(x, 4)) + (10 * Math.pow(x, 3))
}

function dot_product(a, b) {
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

function create_random_vector(n, diagonal) {
    vec = []
    for(let i = 0; i < n; i++) {
        if (diagonal) {
            let component = 1
            if (Math.random() >= 0.5) {
                component = -1
            }
            vec.push(component)
        } else {
            vec.push((Math.rand() * 2) - 1)
        }
    }

    return vec
}

function create_gradient_grid3D(n, m, k, diagonal) {
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
                col.push(create_random_vector(dimension, diagonal))
            }
            row.push(col)
        }
        grid.data.push(row)
    }

    return grid
}

function create_gradient_grid2D(n,m, diagonal) {
    let dimension = 2

    let grid = {
        rows: n,
        cols: m,
        data: [],
    }
    for(let i = 0; i < n; i++) {
        let row = []
        for(let j = 0; j < m; j++) {
            row.push(create_random_vector(dimension, diagonal))
        }
        grid.data.push(row)
    }

    return grid
}

function perlin3D (x, y, z, grid) {
    let x_node = Math.floor(x)
    let y_node = Math.floor(y)
    let z_node = Math.floor(z)
    let dx = x - x_node
    let dy = y - y_node
    let dz = z - z_node


    let ddd = dot_product([dx, dy, dz], grid.data[mod(y_node, grid.rows)][mod(x_node, grid.cols)][mod(z_node, grid.layers)])
    let udd = dot_product([dx, (dy - 1), dz], grid.data[mod((y_node + 1), grid.rows)][mod(x_node, grid.cols)][mod(z_node, grid.layers)])
    let dud = dot_product([(dx - 1), dy, dz], grid.data[mod(y_node, grid.rows)][mod((x_node + 1), grid.cols)][mod(z_node, grid.layers)])
    let uud = dot_product([(dx - 1), (dy - 1), dz], grid.data[mod((y_node + 1), grid.rows)][mod((x_node + 1), grid.cols)][mod(z_node, grid.layers)])

    let ddu = dot_product([dx, dy, (dz - 1)], grid.data[mod(y_node, grid.rows)][mod(x_node, grid.cols)][mod(z_node + 1, grid.layers)])
    let udu = dot_product([dx, (dy - 1), (dz - 1)], grid.data[mod((y_node + 1), grid.rows)][mod(x_node, grid.cols)][mod(z_node + 1, grid.layers)])
    let duu = dot_product([(dx - 1), dy, (dz - 1)], grid.data[mod(y_node, grid.rows)][mod((x_node + 1), grid.cols)][mod(z_node + 1, grid.layers)])
    let uuu = dot_product([(dx - 1), (dy - 1), (dz - 1)], grid.data[mod((y_node + 1), grid.rows)][mod((x_node + 1), grid.cols)][mod(z_node + 1, grid.layers)])

    let UD = lerp(udd, ddd, fade(dy))
    let DD = lerp(uud, dud, fade(dy))

    let UU = lerp(udu, ddu, fade(dy))
    let DU = lerp(uuu, duu, fade(dy))

    let D = lerp(DD, UD, fade(dx))
    let U = lerp(DU, UU, fade(dx))

    return lerp(U, D, fade(dz))
}

function perlin2D (x, y, grid) {
    let x_node = Math.floor(x)
    let y_node = Math.floor(y)
    let dx = x - x_node
    let dy = y - y_node

    let dd = dot_product([dx, dy], grid.data[mod(y_node, grid.rows)][mod(x_node, grid.cols)])
    let ud = dot_product([dx, (dy - 1)], grid.data[mod((y_node + 1), grid.rows)][mod(x_node, grid.cols)])
    let du = dot_product([(dx - 1), dy], grid.data[mod(y_node, grid.rows)][mod((x_node + 1), grid.cols)])
    let uu = dot_product([(dx - 1), (dy - 1)], grid.data[mod((y_node + 1), grid.rows)][mod((x_node + 1), grid.cols)])

    let U = lerp(ud, dd, fade(dy))
    let D = lerp(uu, du, fade(dy))
    return lerp(D, U, fade(dx))
}