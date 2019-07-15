riot.tag2('comment', '<div class="ui row"> <div class="ui grid comment-heading"> <div class="two wide column"> <a class="ui tiny circular image" href="/profiles/{opts.cmt.author.id}/"> <img riot-src="{opts.cmt.author.portrait}"> </a> </div> <div class="eight wide column"> <div class="ui header header-text-container"> <div class="content header-text"> <a href="/profiles/{opts.cmt.author.id}/"> {opts.cmt.author.reference} </a> <div class="sub header comment-date"> {opts.cmt.date_created} </div> </div> </div> </div> </div> </div> <div class="ui divider"></div> <div class="row content"> <div class="ui content comment-text"> {opts.cmt.text} </div> </div> <comment-reply class="ui grid reply" each="{reply in replies}" cmt="{reply}"></comment-reply> <form if="{!opts.cmt.parent}" class="ui form replyform" ref="reply_form"> <div class="field"> <textarea ref="reply_text_area" data-comment-pk="{opts.cmt.pk}" data-author-pk="{opts.cmt.author.id}" rows="2" type="text" name="reply" placeholder="Write a reply..."></textarea> </div> </form>', 'comment { min-height: 60px; width: 80%; margin: 30px !important; padding: 20px 45px 20px 45px !important; background: white; border-radius: 5px; } comment .reply,[data-is="comment"] .reply{ margin: 15px !important; background: #eeeeee; border-radius: 4px !important; padding-top: 0 !important; padding-bottom: 0 !important; } comment .comment-heading,[data-is="comment"] .comment-heading{ width: 100% !important; min-height: 80px; } comment .reply .comment-heading,[data-is="comment"] .reply .comment-heading{ min-height: 65px; } comment .header-text,[data-is="comment"] .header-text{ height: 70px; } comment .reply .header-text,[data-is="comment"] .reply .header-text{ height: 50px; } comment .header-text,[data-is="comment"] .header-text{ display: flex !important; flex-direction: column; justify-content: space-between; text-align: start; } comment .comment-date,[data-is="comment"] .comment-date{ font-size: 1.0em !important; color: #aaaaaa; } comment .comment-text,[data-is="comment"] .comment-text{ font-size: 1.3em; } comment .row.content,[data-is="comment"] .row.content{ display: flex; justify-content: start !important; } comment .replyform,[data-is="comment"] .replyform{ width: 100%; margin: 15px; }', '', function(opts) {
        self = this

        self.on('mount', function () {

            print(self.opts)
            let id = '#reply-text-area-' + opts.cmt.pk
            let reply_form = $(self.refs.reply_text_area)

        })

        self.post_comment = function (text, author_pk, article_pk, parent_pk, csrf_token) {
            let post_data = {
                "text": text,
                "parent": parent_pk,
                "author": author_pk,
                "article": article_pk,
            }

            $.ajax({
                type: 'POST',
                url: '/api/v1/comments/',
                data: JSON.stringify(post_data),
                contentType: 'application/json',
                dataType: 'json',
                headers: {
                    'X-CSRFToken': csrf_token,
                },
            })
            .done(function (data) {

                print(data)
                window.dispatchEvent(new CustomEvent('update_comments', {bubbles: true,}))
            })
            .fail(function (data) {
                print('comment post error:', data)
            })
        }

        self.update_comment = function (opts) {

            $.ajax({
                type: 'GET',
                url: '/api/v1/comments/' + self.opts.cmt.pk,
                data: null,
                contentType: 'application/json',
                dataType: 'json',
            }).done(function (data) {

                self.replies = data.replies
                self.update()
            })
        }

});
riot.tag2('comment-reply', '<div class="ui row"> <div class="ui grid comment-heading"> <div class="two wide column"> <a class="ui tiny circular image" href="/profiles/{opts.cmt.author.id}/"> <img riot-src="{opts.cmt.author.portrait}"> </a> </div> <div class="eight wide column"> <div class="ui header header-text-container"> <div class="content header-text"> <a href="/profiles/{opts.cmt.author.id}/"> {opts.cmt.author.reference} </a> <div class="sub header comment-date"> {opts.cmt.date_created} </div> </div> </div> </div> </div> </div> <div class="ui divider"></div> <div class="row content"> <div class="ui content comment-text"> {opts.cmt.text} </div> </div>', 'comment-reply comment,[data-is="comment-reply"] comment{ min-height: 60px; width: 80%; margin: 30px !important; padding: 20px 45px 20px 45px !important; background: white; border-radius: 5px; } comment-reply .reply,[data-is="comment-reply"] .reply{ margin: 15px !important; background: #eeeeee; border-radius: 4px !important; padding-top: 0 !important; padding-bottom: 0 !important; } comment-reply .comment-heading,[data-is="comment-reply"] .comment-heading{ width: 100% !important; min-height: 80px; } comment-reply .reply .comment-heading,[data-is="comment-reply"] .reply .comment-heading{ min-height: 65px; } comment-reply .header-text,[data-is="comment-reply"] .header-text{ height: 70px; } comment-reply .reply .header-text,[data-is="comment-reply"] .reply .header-text{ height: 50px; } comment-reply .header-text,[data-is="comment-reply"] .header-text{ display: flex !important; flex-direction: column; justify-content: space-between; text-align: start; } comment-reply .comment-date,[data-is="comment-reply"] .comment-date{ font-size: 1.0em !important; color: #aaaaaa; } comment-reply .comment-text,[data-is="comment-reply"] .comment-text{ font-size: 1.3em; } comment-reply .row.content,[data-is="comment-reply"] .row.content{ display: flex; justify-content: start !important; } comment-reply .replyform,[data-is="comment-reply"] .replyform{ width: 100%; margin: 15px; }', '', function(opts) {
});
riot.tag2('comment-section', '<div class="ui container"> <comment class="ui centered grid outer-comment" csrf="{self.opts.csrf}" each="{comm in comments}" cmt="{comm}"></comment> </div>', 'comment-section { background: #21324d; } comment-section .outer-comment,[data-is="comment-section"] .outer-comment{ width: 70% !important; margin-left: auto !important; margin-right: auto !important; }', '', function(opts) {
        self = this

        self.get_comments = function () {
            $.ajax({
                type: 'GET',
                url: '/api/v1/article_comments/' + opts.article_id + '/',
                data: null,
                contentType: 'application/json',
                dataType: 'json',
            }).done(function (data) {
                print(data)
                self.comments = data
                self.update()
            })
        }

        self.on('mount', function () {

            self.get_comments()

            let get_comments = self.get_comments

            window.addEventListener('update_comments', function (e) {

                get_comments()
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

            let max_pixel_ratio = 4
            let min_pixel_ratio = 2
            let pixel_ratio = window.devicePixelRatio
            if(pixel_ratio < min_pixel_ratio) {
                pixel_ratio = min_pixel_ratio
            } else if (pixel_ratio > max_pixel_ratio) {
                pixel_ratio = max_pixel_ratio
            }
            renderer.setPixelRatio(pixel_ratio);
            print('pixel ratio:', pixel_ratio)

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