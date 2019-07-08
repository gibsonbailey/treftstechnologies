riot.tag2('comment', '<div class="ui row"> <div class="ui grid comment-heading"> <div class="left floated six wide column"> <a class="ui tiny circular image" href="/profiles/{opts.cmt.author.id}/"> <img riot-src="{opts.cmt.author.portrait}"> </a> <a class="ui header" href="/profiles/{opts.cmt.author.id}/"> {opts.cmt.author.reference} </a> </div> <div class="floated right six wide column comment-date"> {opts.cmt.date_created} </div> </div> </div> <div class="ui divider"></div> <div class="row"> <div class="ui content comment-text"> {opts.cmt.text} </div> </div> <comment class="ui grid" each="{reply in opts.cmt.replies}" cmt="{reply}"></comment>', 'comment { min-height: 60px; width: 80%; margin: 50px !important; border-left: solid #dddddd; padding-left: 45px !important; } comment .comment-heading,[data-is="comment"] .comment-heading{ width: 100% !important; min-height: 200px; } comment .comment-date,[data-is="comment"] .comment-date{ font-size: 1.5em; color: #aaaaaa; } comment .comment-text,[data-is="comment"] .comment-text{ background: white; }', '', function(opts) {
});
riot.tag2('comment-section', '<comment class="ui grid" each="{comm in comments}" cmt="{comm}"></comment>', '', '', function(opts) {
        self = this

        self.on('mount', function () {
            $.ajax({
                type: 'GET',
                url: '/api/v1/comments/' + self.opts.article_id + '/',
                data: null,
                contentType: 'application/json',
                dataType: 'json',
            }).done(function (data) {
                print(data)
                self.comments = data
                self.update()
            })
        })
});
riot.tag2('perlin', '<canvas id="tutorial"></canvas>', 'perlin canvas,[data-is="perlin"] canvas{ width: 100%; height: 100%; display: block; }', '', function(opts) {

        this.on('mount', function(){
            const white = 0xFFFFFF;
            const green_blue = 0x063a44;
            const dark_gray = 0x222222;
            const light_gray = 0x555555;
            const intensity = 1;
            const camera_width = 2
            const camera_height = 2

            const canvas = document.querySelector('#tutorial')
            const renderer = new THREE.WebGLRenderer({canvas})
            const scene = new THREE.Scene()
            const camera = new THREE.OrthographicCamera( camera_width / - 2, camera_width / 2, camera_height / 2, camera_height / - 2, -1000, 1000 );
            const ambient_light = new THREE.AmbientLight(white)
            var lights = [];
			lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
			lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

			lights[ 0 ].position.set( 0, 200, 0 );
			lights[ 1 ].position.set( 100, 200, 100 );
			lights[ 2 ].position.set( - 100, - 200, - 100 );

            scene.background = new THREE.Color(white)

            if(window.devicePixelRatio <= 2) {
                renderer.setPixelRatio(window.devicePixelRatio);
            } else {
                renderer.setPixelRatio(2);
            }

            const w = 4
            const h = 4
            const res = 12
            const w_res = w * res
            const h_res = h * res
            const plane_geo = new THREE.PlaneGeometry(w, h, w_res, h_res)
            const teal = new THREE.MeshStandardMaterial({
                color: light_gray,
                wireframe: true,
            })
            const plane = new THREE.Mesh(plane_geo, teal)

            const grid = create_gradient_grid3D(10,10,10,true)

            function perlin_vertices3D(geometry, z) {
                let magnitude = 0.13
                let scale = 2
                let length = geometry.vertices.length
                for(let i = 0; i < length; i++) {
                    geometry.vertices[i].z = magnitude * perlin3D(geometry.vertices[i].x * scale, geometry.vertices[i].y * scale, z, grid)

                }
                geometry.verticesNeedUpdate = true
            }

            perlin_vertices3D(plane.geometry, 0)

            plane.rotation.x = -Math.PI / 3.0
            plane.rotation.z = -Math.PI * 0.12

            plane.position.x = 1.3
            print(plane)

            scene.add(plane)
            scene.add(ambient_light);
            scene.add( lights[ 0 ] );
            scene.add( lights[ 1 ] );
            scene.add( lights[ 2 ] );

            renderer.render(scene, camera)

            function render(time) {
                time *= 0.00015

                const canvas = renderer.domElement
                let canvas_width = canvas.clientWidth
                let canvas_height = canvas.clientHeight
                if(canvas.width != canvas_width || canvas.height != canvas_height) {
                    renderer.setSize(canvas_width, canvas_height, false)
                    let aspect = canvas_width / canvas_height
                    let width = camera_height * aspect / 2
                    camera.left = -width
                    camera.right = width
                    camera.updateProjectionMatrix()
                }

                perlin_vertices3D(plane.geometry, time)

                renderer.render(scene, camera)
                requestAnimationFrame(render)
            }
            requestAnimationFrame(render)
        })
});