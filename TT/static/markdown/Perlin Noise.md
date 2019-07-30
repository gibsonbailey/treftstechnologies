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

### Initialize Vector Field

The 2-dimensional vector field of random 2-dimensional vectors will be held as a two-dimensional array of vectors. 
Each vector will be generated with an x and y component of equal magnitude. This creates the effect of diagonal
vectors. To simplify, both the x and y components will be set to either \\(1\\)  or \\(-1\\) randomly. The JavaScript 
code below is built to generate an \\(n\\)-dimensional vector which will be useful later.

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
introduction of the dot product is in order. Skip this section if you are already knowledgeable 
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

\\[
a \cdot c = (2 \cdot 1) + (1 \cdot 1) = 3
\\]

</br></br>

### Dot Product Calculation for Perlin Noise

At this point, a 2D grid of 2D vectors has been generated. For each
output value that will be generated, there will be four dot products 
to calculate, one for each neighboring grid point of the input coordinates. 

On the graph below, place your mouse at any point. You'll see a blue vector from 
the base of the inhabited cell to your cursor. This is the vector that will be 
dotted with the four closest grid vectors. These vectors have been scaled for the 
sake of aesthetics, but their \\(x\\) and \\(y\\) components are all either 1 or -1.

<div class="article-canvas-container static-canvas">
    <canvas id="vector-field-dot-graph" class="large-article-canvas"></canvas>
</div>

In order to build the vector which the blue cursor vector represents, the vector 
controlling the output of our `get_value` function, we must know which cell the 
cursor (or general input) coordinates are in.

### Interpolate Between Dot Products


<div class="centered-ellipsis">...</div>

# 3 Dimensions


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
    
    let arrow_start = ob.grid_to_canvas_space(x_base, y_base)
    let label = {}
    label.text = '(' + (cursor_pos.x - x_base).toFixed(2) + ', ' + (y_base - cursor_pos.y).toFixed(2) + ')'
    label.color = 'white'
    ob.draw_arrow(x_base, y_base, cursor_pos.x - x_base, y_base - cursor_pos.y, 3, TT_light_blue, label)
}


vec_dot.set_extra_draw_func(draw_cursor_arrow)

//for (let i = 0; i < vec_field_array.length; i++) {
//    vec_field_array[i].color = TT_blue
//}

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

</script>