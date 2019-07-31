<div class="centered-ellipsis">...</div>

### What is noise?

Noise can be defined as random fluctuations superimposed upon a signal. It is 
ubiquitous in nature and can take many different forms. In most engineering 
disciplines, noise is a nuisance. However, it can be a useful tool in the 
development of realistic graphics. 

### Non-Coherent Noise vs Perlin Noise

Non-Coherent noise jumps sharply from one value to the next in a sequence. There are a number of methods
that can be used to smooth out the noise, one of them being Perlin's. The contrast between non-coherent 
and Perlin noise can be seen below.

</br></br></br>

<div class="two-article-canvas-container static-canvas">
    <canvas id="non-coherent-noise-graph" class="small-article-canvas"></canvas>
    <canvas id="standard-1d-perlin-noise-graph" class="small-article-canvas"></canvas>
</div>

</br></br></br>

### Perlin Noise
Perlin noise, invented in 1983 by Ken Perlin, is a remedy to the unnatural 
look of non-coherent noise. Perlin noise was designed to vary smoothly, 
creating a rolling-hill aesthetic. Using the algorithm that Ken Perlin 
developed, we will create noise in 1 dimension, 2 dimensions, and 3 dimensions. The process
for calculating the noise has been broken down into discrete sections, usually
involving initialization, dot product calculation, and interplolation. 

<div class="centered-ellipsis">...</div>

<!--
# 1 Dimension

### Initialize Scalar Array

Scalar is just another term for a real number. It can also be thought of as a 1-dimensional vector.
An array of uniformly random scalars must be initialized which, in Javascript looks like this. On the
graph below, one possible combination of these values is shown.

<div class="article-canvas-container static-canvas">
    <canvas id="scalar-initialization-graph" class="large-article-canvas"></canvas>
</div>

</br></br>

### Interpolate Between Scalars

<div class="article-canvas-container static-canvas">
    <canvas id="scalar-interpolation-graph" class="large-article-canvas"></canvas>
</div>

</br></br>

### Smooth Step Interpolation i.e. Fade Function

<div class="article-canvas-container static-canvas">
    <canvas id="scalar-smooth-interpolation-graph" class="large-article-canvas"></canvas>
</div>

</br></br>

<div class="centered-ellipsis">...</div>
-->

# Original Perlin Noise Algorithm

First, I'll discuss the original 2-dimensional Perlin noise. This can easily be used to create 1-dimensional
noise. Next, 3-dimensional noise will be implemented as a modification to the algorithm for 2-dimensional noise.

Throughout this tutorial, we'll be developing a JavaScript class that can be used to generate Perlin noise. The 
completed code can be found on [Github here][github_perlin_code].

### Initialize Vector Field

The 2-dimensional vector field of random 2-dimensional vectors will be held as a two-dimensional array of vectors. 
Each vector will be generated with an x and y component of equal magnitude. This creates the effect of diagonal
vectors. To simplify, both the x and y components will be set to either \\(1\\)  or \\(-1\\) randomly. The JavaScript 
code below is built to generate an \\(n\\)-dimensional, diagonal vector which will be useful later.

```
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
```

Next, the 2d array of vectors can be initialized.

```
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
```

Below is a visualization of what has just been initialized.

<div class="article-canvas-container static-canvas">
    <canvas id="vector-field-initialization-graph" class="large-article-canvas"></canvas>
</div>

</br></br>

### Calculate Dot Products

The dot product calculation in the Perlin noise algorithm will be discussed, but first, a short
introduction of the dot product is in order. [Skip this section](#perlin-dot-product) if you are already knowledgeable 
on this subject of mathematics.

### Dot Product Introduction

The dot product is a measure of how similar two vectors are. For example, if two vectors are orthogonal,
their dot product is zero. If they point in opposite directions, their dot product is negative. If they
point in the same general direction, their dot product will be positive. Below is the definition of the
dot product with a small example of the dot product calculation to follow.

Given two vectors, \\(a\\) and \\(b\\), of length \\(n\\)
\\[
a \cdot b = \sum_{i=1}^{n} a_{i}b_{i} = a_{1}b_{1} + a_{2}b_{2} + \ldots + a_{n}b_{n}
\\]

### e.g.

\\[
a = \\begin{bmatrix} 
    2 \\\\ 
    1 \\\\ 
    \\end{bmatrix}  
    ,
b = \\begin{bmatrix} 
    -2 \\\\ 
    4 \\\\ 
    \\end{bmatrix}  
    ,
c = \\begin{bmatrix} 
    1 \\\\ 
    1 \\\\ 
    \\end{bmatrix}  
\\]

</br>

\\(a\\) and \\(b\\) are orthogonal.

<div class="article-canvas-container static-canvas">
    <canvas id="a-b-vector-graph" class="large-article-canvas"></canvas>
</div>

\\[
a \cdot b = (2 \cdot -2) + (1 \cdot 4) = 0
\\]

</br></br></br>

\\(a\\) and \\(c\\) point in the same general direction.

<div class="article-canvas-container static-canvas">
    <canvas id="a-c-vector-graph" class="large-article-canvas"></canvas>
</div>
<a name="perlin-dot-product"></a>
\\[
a \cdot c = (2 \cdot 1) + (1 \cdot 1) = 3
\\]

</br></br>

###  Dot Product Calculation for Perlin Noise

At this point, a 2D grid of 2D vectors has been generated. For each
output value that will be generated, there will be four dot products 
to calculate, one for each neighboring grid point of the input coordinates. 

On the graph below, place your mouse at any point. You'll see a blue vector and 
three brown vectors that extend from each corner of the inhabited cell to your cursor. 
Each of these vectors will be dotted with their corresponding grid vector, the white vector 
that shares a given base. These white grid vectors have been scaled for the sake of 
aesthetics, but their \\(x\\) and \\(y\\) components are all either 1 or -1.

<div class="article-canvas-container static-canvas">
    <canvas id="vector-field-dot-graph" class="large-article-canvas"></canvas>
</div>

Let's now build the colored vectors. The brown vectors can be defined in terms of the
blue one, so we'll define that one first. 

To start, we must know which cell the cursor (or general input) coordinates are in. 
This can be calculated as a difference between the 
coordinates of the tip of the blue vector (cursor location) and the coordinates of 
the corresponding grid vertex (at its base). Below, the coordinates of the head of the
blue vector are labeled as `x` and `y`. 

```
   let x_node = Math.floor(x)
   let y_node = Math.floor(y)
   let dx = x - x_node
   let dy = y - y_node
```

`dx` and `dy` above represent the horizontal and vertical components of the blue
vector. We will call the  vector \\(b\\). `x_node` and `y_node` can be used to identify
which grid cell the input value inhabits.

\\[
b = \\begin{bmatrix} 
    dx \\\\ 
    dy \\\\ 
    \\end{bmatrix}  
\\]

Each of the brown vectors can be calculated in the following manner. Each grid cell's width
and height are both \\(1\\). We can subtract \\(b\\) from a vector pointing to each corner
of the cell to find that corner's brown (or blue) vector.

In the following definition, we'll label the four corner vectors \\(c\\) with two subscripts representing the
x and y positions within a cell. For example, \\(c_{0,1}\\) is the vector from \\((0, 0)\\) to the left, upper 
corner at \\((0, 1)\\).

We will now define the vectors from each corner to the head of the blue vector. We'll 
call these vectors \\(a_{x,y}\\).

\\[
    a_{x,y} = b - c_{x,y}
\\]

For example, the lower left vector, \\(a_{0,0}\\) is \\( \\begin{bmatrix} dx\\\\ dy\\\\ \\end{bmatrix} - \\begin{bmatrix} 0\\\\ 0\\\\ \\end{bmatrix}\\),
 or just \\(b\\).
 
We need a couple of utility functions, namely `mod` and `dot_product` which are defined below.

```
    mod = (x, y) => {
        return (x % y + y) % y
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
```

The dot products between our \\(a\\) vectors and their corresponding grid vectors can be calculated now.

```
    let ll = this.dot_product([dx, dy], this.grid.data[this.mod(y_node, this.grid.rows)][this.mod(x_node, this.grid.cols)])
    let lu = this.dot_product([dx, (dy - 1)], this.grid.data[this.mod((y_node + 1), this.grid.rows)][this.mod(x_node, this.grid.cols)])
    let ul = this.dot_product([(dx - 1), dy], this.grid.data[this.mod(y_node, this.grid.rows)][this.mod((x_node + 1), this.grid.cols)])
    let uu = this.dot_product([(dx - 1), (dy - 1)], this.grid.data[this.mod((y_node + 1), this.grid.rows)][this.mod((x_node + 1), this.grid.cols)])
```

`l` and `u` represent the upper and lower x and y values, 0 and 1.

### Interpolate Between Dot Products

In order to get a smoothly varying function of input values, we can interpolate between the 4 values calculated above.
First, interpolate between `lu` and `ll`, then between `uu` and `ul`, then between the two values produced by the prior interpolations.

Linear interpolation can be defined as below.

```
    lerp = (a, b, w) => {
        return (w * a) + ((1 - w) * b)
    }
```

Where `a` and `b` are the bounding values to interpolate between and w is a value between zero and one that defines how far
between `a` and `b` to interpolate.

Perlin noise uses a modified interpolation function to increase the smoothness and organic nature of the noise. There is a set 
of functions called _smoothstep_ or _fade_ functions, characterized by their smoothness and null derivative at 0 and 1.
Ken Perlin chose a _smoothstep_ function \\(f(x) = 6x^5 - 15x^4 + 10x^3\\) (plotted below) of which both the first and second derivatives are 
zero at \\(x=0\\) and \\(x=1\\).

<div class="article-canvas-container static-canvas">
    <canvas id="smootherstep-graph" class="large-article-canvas"></canvas>
</div>

```
    fade = (x) => {
        return (6 * Math.pow(x, 5)) - (15 * Math.pow(x, 4)) + (10 * Math.pow(x, 3))
    }
```

Now, when we interpolate between the dot products, we'll use the smooth interpolation interpolation function defined below.

```
    smerp = (a, b, w) => {
        return this.lerp(a, b, this.fade(w))
    }
```

At this point, the whole `perlin2D` function is ready to be assembled.

```
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
```

We reference `this.grid.data`, because it has been set as an attribute of the class. This is not shown in the code here,
but can be found in the [complete code][github_perlin_code] on Github.

<div class="centered-ellipsis">...</div>

# 3 Dimensions

In order to implement 3-dimensional Perlin Noise, two functions from our 2-dimensional implementation must be 
modified, `create_gradient_grid2D` and `perlin2D`. The 3-dimensional versions of these functions are very similar.

In three dimensions, each cell is a cube with eight vertices. That means that there are eight dot products that must
be calculated and interpolated between. This is reflected below in the `perlin3d` code.

``` 
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
```

The 3-dimensional grid generation function has another loop to add another dimension. The randomly generated vectors are 
3-dimensional as well.

``` 
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
```

</br></br>
The 3-dimensional implementation is being used to create the following live graphic.

<div class="article-canvas-container">
    <perlin background_color="#000000" mesh_color="{TT_blue}" border_radius="4" class="huge-article-canvas"></perlin>
</div>

# Conclusion

Now the power of creating organic noise is in your hands. Leave a comment below with your thoughts on this article. If you decide to create something 
using Perlin noise, please feel free to share your project with me. 

<script>
let tic_spacing = 65
let background_color = 'rgb(5, 5, 15)'


let axis_config = {
    origin: {
        x: 250,
        y: 250,
    },
    line_width: 2,
    color: 'rgb(225, 227, 230)',
    grid: false,
}

/**********************/
/* Non-Coherent Array */
/**********************/

non_coh_canvas = document.getElementById('non-coherent-noise-graph') 
non_coh = new TTplot(non_coh_canvas, 25, background_color)

let small_axis_config = {
    origin: {
        x: 190,
        y: 190,
    },
    line_width: 2,
    color: 'rgb(225, 227, 230)',
    grid: false,
}

non_coh.axes(small_axis_config)

let nc_array = []
let nc_res = 0.2
for(let i = -10; i < 11; i += nc_res) {
    nc_array.push({
        x: i,
        y: (-1 + Math.random() * 2) * 2,
    })
}
let array_options = {
    line_width: 2,
    color: 'white',
}
non_coh.set_array(nc_array, array_options)

/*****************/
/* Std 1D Perlin */
/*****************/

std_perlin_canvas = document.getElementById('standard-1d-perlin-noise-graph') 
std_perlin = new TTplot(std_perlin_canvas, 25, background_color)
std_perlin.axes(small_axis_config)

let scalar_quantity = 20
let far_left = -8
let scalar_arrows = []
let coherent_values = []
scalar = new Perlin(1, 0.7, 8)
coarse = new Perlin(1, 1.5, 3)
fine = new Perlin(1, 5, 1)

let std_perlin_function_options = {
    line_width: 2,
    color: 'white',
    res: 1,
}
std_perlin.set_func( (x) => scalar.get_value(x), std_perlin_function_options)

/*******************************/
/* Vector Field Initialization */
/*******************************/

vec_field_canvas = document.getElementById('vector-field-initialization-graph')
vec_field = new TTplot(vec_field_canvas, 80, background_color)

let vec_field_axis_config = {
    origin: {
        x: 250,
        y: 250,
    },
    line_width: 1,
    color: 'rgb(50,50,50)',
    grid: true,
}

vec_field.axes(vec_field_axis_config)

let vec_field_array = []
let mag = 0.25
for (let i = -10; i < 10; i++) {
    for (let j = -10; j < 10; j++) {
        let a = mag
        let b = mag
        
        if (Math.random() >= 0.5) {
            a = -mag
        }
        if (Math.random() >= 0.5) {
            b = -mag
        }
        
        vec_field_array.push({
            start_point: {
                x: i,
                y: j,
            },
            delta: {
                x: a,
                y: b,
            },
            line_width: 2,
            color: 'white',
        })
    }
}

vec_field.set_arrows(vec_field_array)


/****************************/
/* Vector Field Dot Product */
/****************************/

let unit_width = 80
vec_dot_canvas = document.getElementById('vector-field-dot-graph')
vec_dot = new TTplot(vec_dot_canvas, unit_width, background_color)

vec_dot.axes(vec_field_axis_config)

function draw_cursor_arrow(ob, c_x, c_y) {
    let cursor_pos = ob.canvas_to_grid_space(c_x, c_y)
    let x_base = Math.floor(cursor_pos.x)
    let y_base = Math.floor(cursor_pos.y) + 1
    
    let label = {}
    label.text = '(' + (cursor_pos.x - x_base).toFixed(2) + ', ' + (y_base - cursor_pos.y).toFixed(2) + ')'
    label.color = 'white'
    
    ob.draw_arrow(x_base + 1, y_base - 1, cursor_pos.x - x_base - 1, y_base - cursor_pos.y - 1, 3, TT_brown)
    ob.draw_arrow(x_base + 1, y_base, cursor_pos.x - x_base - 1, y_base - cursor_pos.y, 3, TT_brown)
    ob.draw_arrow(x_base, y_base - 1, cursor_pos.x - x_base, y_base - cursor_pos.y - 1, 3, TT_brown)
    ob.draw_arrow(x_base, y_base, cursor_pos.x - x_base, y_base - cursor_pos.y, 3, TT_light_blue, label)
}


vec_dot.set_extra_draw_func(draw_cursor_arrow)
vec_dot.set_arrows(vec_field_array)


/****************************/
/* Dot Product Introduction */
/****************************/

ab_vec_canvas = document.getElementById('a-b-vector-graph') 
ac_vec_canvas = document.getElementById('a-c-vector-graph') 
ab_vec = new TTplot(ab_vec_canvas, tic_spacing, background_color)
ac_vec = new TTplot(ac_vec_canvas, tic_spacing, background_color)

axis_config = {
    origin: {
        x: 250,
        y: 100,
    },
    line_width: 2,
    color: 'rgb(225, 227, 230)',
    grid: false,
}


ab_vec.axes(axis_config)
ac_vec.axes(axis_config)

let a = {
    start_point: {
        x: 0,
        y: 0,
    },
    delta: {
        x: 2,
        y: 1,
    },
    line_width: 4,
    color: TT_light_blue,
    label: {
        text: 'a',
        color: 'white',
    }
}

let b = {
    start_point: {
        x: 0,
        y: 0,
    },
    delta: {
        x: -2,
        y: 4,
    },
    line_width: 4,
    color: TT_blue,
    label: {
        text: 'b',
        color: 'white',
    }
}

let c = {
    start_point: {
        x: 0,
        y: 0,
    },
    delta: {
        x: 1,
        y: 1,
    },
    line_width: 4,
    color: TT_brown,
    label: {
        text: 'c',
        color: 'white',
    }
}


ab_vec.set_arrows([a, b])
ac_vec.set_arrows([a, c])

/*******************************/
/* Smootherstep Function Graph */
/*******************************/

smootherstep_canvas = document.getElementById('smootherstep-graph') 
smootherstep = new TTplot(smootherstep_canvas, 350, background_color)

axis_config = {
    origin: {
        x: 100,
        y: 100,
    },
    line_width: 2,
    color: 'rgb(225, 227, 230)',
    grid: false,
}

smootherstep.axes(axis_config)
let smootherstep_function_options = {
    line_width: 2,
    color: 'white',
    res: 1,
}

smootherstep.set_func( (x) => (6 * Math.pow(x, 5)) + (-15 * Math.pow(x, 4)) + (10 * Math.pow(x, 3)), smootherstep_function_options)

riot.mount('*')
</script>

[github_perlin_code]: https://github.com/gibsonbailey/treftstechnologies/blob/master/TT/static/js/utility/perlin.js 
