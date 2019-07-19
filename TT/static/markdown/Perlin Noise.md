<div class="centered-ellipsis">...</div>

### What is noise?

Noise can be defined as random fluctuations superimposed upon a signal. It is 
ubiquitous in nature and can take many different forms. In most engineering 
disciplines, noise is a nuisance. However, it can be a useful tool in the 
development of realistic graphics. 

### Totally random noise vs Perlin Noise

Totally random noise jumps sharply from one value to the next in a sequence. There are a number of methods
that can be used to smooth out the noise, one of them being Perlin's. The contrast between totally random
noise and Perlin noise can be seen below.

</br></br></br>
### 1d noise graph
</br></br></br>
### 1d perlin noise graph
</br></br></br>

### Perlin Noise
Perlin noise, invented in 1983 by Ken Perlin, is a remedy to the unnatural 
look of truly random noise. Perlin noise was designed to vary smoothly, 
creating a rolling-hill aesthetic. Using the algorithm that Ken Perlin 
developed, we will generate smooth noise in 1D, 2D, and even 3D. The process
for calculating the noise has been broken down into discrete sections, usually
involving initialization, dot product calculation, and interplolation. 

<div class="centered-ellipsis">...</div>

# 1 Dimension

### Initialize Scalar Array

Scalar is just a 1D vector (real number).

### Interpolate Between Scalars

### Smooth Step Interpolation i.e. Fade Function

<div class="centered-ellipsis">...</div>

# 2 Dimensions

### Initialize Vector Field

### Calculate Dot Products

The dot product calculation in the Perlin noise algorithm will be discussed, but first, a short
introduction of the dot product is in order. Skip this section if you are already knowledgeable 
on this subject of mathematics.

### Dot Product Introduction

The dot product is a measure of how similar two vectors are. For example, if two vectors are orthogonal,
their dot procuct is zero. If they point in opposite directions, their dot product is negative. If they
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

</br></br></br>

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


### Interpolate Between Dot Products

<div class="centered-ellipsis">...</div>

# 3 Dimensions


<script>
let tic_spacing = 50
//let background_color = 'rgb(59, 61, 69)'
let background_color = 'rgb(5, 5, 15)'

ab_vec_canvas = document.getElementById('a-b-vector-graph') 
ac_vec_canvas = document.getElementById('a-c-vector-graph') 

ab_vec = new TTplot(ab_vec_canvas, tic_spacing, background_color)
ac_vec = new TTplot(ac_vec_canvas, tic_spacing, background_color)

let origin = {}
origin.x = 250
origin.y = 150

ab_vec.draw_2d_axes(origin.x, origin.y, 2, 'rgb(225, 227, 230)')
ac_vec.draw_2d_axes(origin.x, origin.y, 2, 'rgb(225, 227, 230)')
ab_vec.canvas_arrow(origin.x, origin.y, 2, 1, 4, TT_light_blue, 'a', 'rgb(255, 255, 255)')
ac_vec.canvas_arrow(origin.x, origin.y, 2, 1, 4, TT_light_blue, 'a', 'rgb(255, 255, 255)')
ab_vec.canvas_arrow(origin.x, origin.y, -2, 4, 4, TT_blue, 'b', 'rgb(255, 255, 255)')
ac_vec.canvas_arrow(origin.x, origin.y, 1, 1, 4, TT_brown, 'c', 'rgb(255, 255, 255)')
</script>