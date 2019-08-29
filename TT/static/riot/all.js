riot.tag2('comment', '<div class="ui row"> <div class="ui grid comment-heading"> <div class="two wide column"> <a class="ui tiny circular image" href="/profiles/{opts.cmt.author.id}/"> <img riot-src="{opts.cmt.author.portrait}"> </a> </div> <div class="eight wide column"> <div class="ui header header-text-container"> <div class="content header-text"> <a href="/profiles/{opts.cmt.author.id}/"> {opts.cmt.author.reference} </a> <div class="sub header comment-date"> {format_datestring(opts.cmt.date_created)} </div> </div> </div> </div> <div class="six wide column"> <div if="{opts.cmt.author.id == TT.user.pk || TT.user.is_superuser}" class="ui right floated mini icon button delete-button" id="delete-comment-{opts.cmt.id}"> <i class="black delete icon"></i> </div> </div> </div> </div> <div class="ui divider"></div> <div class="row content"> <div class="ui content comment-text"> {opts.cmt.text} </div> </div> <comment class="ui grid reply" each="{reply in opts.cmt.replies}" cmt="{reply}"></comment> <form if="{!opts.cmt.parent}" class="ui form replyform"> <div class="field"> <textarea id="reply-text-area-{opts.cmt.id}" rows="2" type="text" name="reply" placeholder="Write a reply..."></textarea> </div> </form>', 'comment { min-height: 60px; width: 80%; margin: 30px !important; padding: 20px 45px 20px 45px !important; background: white; border-radius: 5px; } comment .reply,[data-is="comment"] .reply{ margin: 15px !important; background: #eeeeee; border-radius: 4px !important; padding-top: 0 !important; padding-bottom: 0 !important; width: 90%; } comment .comment-heading,[data-is="comment"] .comment-heading{ width: 100% !important; min-height: 80px; } comment .reply .comment-heading,[data-is="comment"] .reply .comment-heading{ min-height: 65px; } comment .header-text,[data-is="comment"] .header-text{ height: 70px; } comment .reply .header-text,[data-is="comment"] .reply .header-text{ height: 50px; } comment .header-text,[data-is="comment"] .header-text{ display: flex !important; flex-direction: column; justify-content: space-between; text-align: start; } comment .comment-date,[data-is="comment"] .comment-date{ font-size: 1.0em !important; color: #aaaaaa; } comment .comment-text,[data-is="comment"] .comment-text{ text-align: start; font-size: 1.3em; line-height: 1.5em; white-space: pre-line; } comment .row.content,[data-is="comment"] .row.content{ display: flex; justify-content: start !important; } comment .replyform,[data-is="comment"] .replyform{ width: 100%; margin: 15px; } comment .delete-button,[data-is="comment"] .delete-button{ width: 30px; height: 30px; background: #bbbbbb !important; } comment .black.delete.icon,[data-is="comment"] .black.delete.icon{ margin: auto !important; } comment .delete-options,[data-is="comment"] .delete-options{ display: flex !important; justify-content: center; }', '', function(opts) {
        var self = this

        function text_area_behavior(el, disabled) {
            el.keydown(function (e) {
                if (disabled) {
                    $(this).val(function (i, val) {
                        return ''
                    })
                } else {
                    if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
                        $(this).val(function (i, val) {
                            let pos = e.target.selectionStart
                            let spliced_string = val.slice(0, pos) + '\n' + val.slice(pos)
                            return spliced_string
                        })
                    } else if (e.keyCode === 13 && !e.ctrlKey) {
                        e.preventDefault()
                        let text = $(this).val()
                        self.post_comment(text, self.opts.cmt.article, self.opts.cmt.id)
                    }
                }
            })
        }

        self.on('mount', function () {
            let id = '#reply-text-area-' + self.opts.cmt.id
            let reply_form = $(id)
            if (TT.user.pk == 'None') {
                text_area_behavior(reply_form, true)
                reply_form.on('click', function (e){
                    $('#login_menu').click()
                })
            } else {
                text_area_behavior(reply_form, false)
            }
            let delete_button = $('#delete-comment-' + self.opts.cmt.id)
            delete_button.on('click', function (e) {
                let pk = opts.cmt.id
                TT.events.trigger('comment_delete', pk)
            })
        })

        self.post_comment = function (text, article_pk, parent_pk) {
            let post_data = {
                "text": text,
                "parent": parent_pk,
                "author": TT.user.pk,
                "article": article_pk,
            }
            $.ajax({
                type: 'POST',
                url: '/api/v1/comments/',
                data: JSON.stringify(post_data),
                contentType: 'application/json',
                dataType: 'json',
            })
            .done(function (data) {
                TT.events.trigger('comment_posted', false)
            })
            .fail(function (data) {
                print('comment post error:', data)
            })
        }
});
riot.tag2('comment-section', '<div class="ui container"> <form class="ui form commentform"> <div class="field"> <textarea rows="3" type="text" name="comment" placeholder="Respond with a comment..." ref="comment_textarea"></textarea> </div> </form> <comment class="ui centered grid outer-comment" each="{comm in comments}" cmt="{comm}"></comment> </div>', 'comment-section { min-height: 400px; background: var(--TT-blue); } comment-section .outer-comment,[data-is="comment-section"] .outer-comment{ width: 70% !important; margin-left: auto !important; margin-right: auto !important; } comment-section .commentform,[data-is="comment-section"] .commentform{ width: 70%; margin: 50px auto 50px auto; }', '', function(opts) {
        var self = this

        function get_comments(scroll) {
            $.ajax({
                type: 'GET',
                url: '/api/v1/article_comments/' + self.opts.article_id + '/',
                data: null,
                contentType: 'application/json',
                dataType: 'json',
            }).done(function (data) {
                self.comments = data
                self.update()
                if (scroll) {
                    $('html,body').animate({scrollTop: document.body.scrollHeight}, 350);
                }
            })
        }

        function delete_comment(pk) {
            $.ajax({
                type: 'DELETE',
                url: '/api/v1/comments/' + pk,
                data: JSON.stringify(null),
                contentType: 'application/json',
                dataType: 'json',
            })
                .done(function (data) {
                    TT.events.trigger('comment_posted', false)
                })
                .fail(function (data) {
                    print('comment post error:', data)
                })
        }

        self.post_comment = function (text, article_pk) {
            let post_data = {
                text: text,
                author: TT.user.pk,
                article: self.opts.article_id,
                parent: null,
            }
            $.ajax({
                type: 'POST',
                url: '/api/v1/comments/',
                data: JSON.stringify(post_data),
                contentType: 'application/json',
                dataType: 'json',
            })
                .done(function (data) {
                    TT.events.trigger('comment_posted', true)
                })
                .fail(function (data) {
                    print('comment post error:', data)
                })
        }

        function text_area_behavior(el, disabled) {
            el.keydown(function (e) {
                if (disabled) {
                    $(this).val(function (i, val) {
                        return ''
                    })
                } else {
                    if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
                        $(this).val(function (i, val) {
                            let pos = e.target.selectionStart
                            let spliced_string = val.slice(0, pos) + '\n' + val.slice(pos)
                            return spliced_string
                        })
                    } else if (e.keyCode === 13 && !e.ctrlKey) {
                        e.preventDefault()
                        let text = $(this).val()
                        self.post_comment(text)
                        $(this).val(function (i, val) {
                            return ''
                        })
                        $(this).blur()
                    }
                }
            })
        }
        self.on('mount', function () {
            let comment_input = $(self.refs.comment_textarea)
            if (TT.user.pk == 'None') {
                text_area_behavior(comment_input, true)
                comment_input.on('click', function (e){
                    $('#login_menu').click()
                })
            } else {
                text_area_behavior(comment_input, false)
            }
            get_comments(false)
        })

        TT.events.on('comment_posted', function(scroll) {
            get_comments(scroll)
        })

        TT.events.on('comment_delete', function (pk) {
            $('.ui.basic.modal')
                .modal({
                    onApprove: function () {
                        delete_comment(pk)
                    }
                })
                .modal('show')
        })
});
riot.tag2('perlin', '<canvas if="{!!opts.border_radius}" id="perlin-3d-canvas" riot-style="border-radius: {opts.border_radius}px;"></canvas> <canvas if="{!opts.border_radius}" id="perlin-3d-canvas"></canvas>', 'perlin canvas,[data-is="perlin"] canvas{ width: 100%; height: 100%; display: block; }', '', function(opts) {
        var self = this

        self.on('mount', function(){
            const white = 0xFFFFFF;
            const green_blue = 0x063a44;
            const dark_gray = 0x222222;
            const light_gray = 0x555555;
            const intensity = 1;
            const camera_width = 2
            const camera_height = 2

            let mesh_color = light_gray
            if (!!self.opts.mesh_color) {
                mesh_color = self.opts.mesh_color
            }

            const canvas = document.querySelector('#perlin-3d-canvas')
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

            if (!!self.opts.background_color) {
                scene.background = new THREE.Color(self.opts.background_color)
            } else {
                scene.background = new THREE.Color(white)
            }

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
            const mesh_material = new THREE.MeshStandardMaterial({
                color: mesh_color,
                wireframe: true,
            })
            const plane = new THREE.Mesh(plane_geo, mesh_material)

            const perlin = new Perlin(3, 1, 1)

            function perlin_vertices3D(geometry, z) {
                let magnitude = 0.13
                let scale = 2
                let length = geometry.vertices.length
                for(let i = 0; i < length; i++) {
                    geometry.vertices[i].z = magnitude * perlin.get_value(geometry.vertices[i].x * scale, geometry.vertices[i].y * scale, z)
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