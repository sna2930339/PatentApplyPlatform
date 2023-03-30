var lk = lk || {};
(function(){

    bindphone=function(){


    }
    bindphone.prototype.bindEvent=function(){
        var self=this;
        //鐐圭‘璁ゅ揩鎹风櫥褰�

        if(!$('.confirmBind').hasClass('bind')){
            $('.confirmBind').bind('click',function(){
                var p=$(this).parents('.popWrapBox');
                var account=p.find('.account').val();
                var data={};
                data.account=account;
                data.code=p.find('.checkPhoneCode').val();
                data.auth=wefwe();

                var url='/home/login/aftsnsLoginBinds';

                $.post(url,data,function(d){
                    if(d.status){
                        $.alert('缁戝畾鎴愬姛!');
                        window.location.href='/home/user/center';
                    }else{
                        $.alert(d.msg);
                    }
                },'json');
            });
            $('#confirmqLogin').addClass('bind');
        }

        var countdown=60;
        function settime(btn) {
            if (countdown <= 0) {
                btn.removeClass('bindSend');
                btn.text("鍙戦€侀獙璇佺爜");
                countdown = 60;
            } else {
                btn.addClass('bindSend');
                btn.text('閲嶆柊鍙戦€�(' + countdown + ')');
                countdown--;

                setTimeout(function() {
                    settime(btn)
                },1000)
            }
        }
        //杩樻湁鍙戦€侀獙璇佺爜浜嬩欢绛�?
        if(!$('.jsbdsendCode').hasClass('bind')){
            $('.jsbdsendCode').bind('click',function(){
                if($(this).hasClass('bindSend')){
                    return;
                }
                var p=$(this).parents('.popWrapBox');
                var account=p.find('.account').val();

                var btn=$(this);
                $.post('/home/login/sendCode',{'auth':wefwe(),'phone':account,'type':'bindAccount'},function(d){
                    if(d.status){
                        btn.addClass('bindSend');
                        settime(btn);
                        $('.aftersendbox').fadeIn();
                    }else{
                        $.alert(d.msg);
                    }
                },'json');
            });
            $('.jsbdsendCode').addClass('bind');
        }

    }

    lk.bindphone = bindphone ;
})();
var bindphone=new bindphone();

var lk = lk || {};

(function(){

    id_check=function(){
        this.bindEvent();
    }
    id_check.prototype.bindEvent=function(){
        var self=this;

        $('.js_mypop_check').click(function(){
            var mk_id=$(this).attr('data-id');

            $.post('/home/user/id_check_list',{},function(d){
                if(d.status){
                    self.checklist(d.data,mk_id);
                }else{

                    self.addnew();
                }
            },'json');



        });

    }
    id_check.prototype.checklist=function(dat,mk_id){
        var self=this;

        var my_pop_ope = new sl.app.my_pop_ope();
        var aft = {
            checkid: {
                'type':'tag_select',
                'title':'韬唤鍒楄〃锛�',
                'def':'',
                'data':dat
            },
            addnew:{
                'type':'tag_select',
                'title':'鏂板锛�',
                'def':'',
                'data':[{v:'addnewid',s:'鏂板涓€涓韩浠�'}]
            }
        };
        var param={
            'where_val':mk_id,
            'where_key':'id',
            'title':'缁戝畾韬唤',
            'url':'/home/user/bind_id_check',
            'cus_bind_event':function(){
                $('.my_sel_act[data-value="addnewid"]').click(function(){
                    self.addnew();
                });
            }
        }

        param.callback=function(p){

        };
        my_pop_ope.create_form(aft,param);
    }
    id_check.prototype.bind_addnew=function(){
        var self=this;

        $('.js_my_add_new_id').click(function(){
            self.addnew();
        });

    }
    id_check.prototype.addnew=function(){

        var my_pop_ope = new sl.app.my_pop_ope();
        var aft = {
            id_type:{data:[{v:'0',s:'涓汉',toggle:'myid_0'},{v:'1',s:'鍏徃',toggle:'myid_1'}],type:'tag_select','def':'1','title':'韬唤绫诲瀷'},
            wrap_1:{self_class:'myid_1 togglebox',type:'wrap_start'},
            cp_name : {type:'input',def: '','title':'鍏徃鍚嶅瓧'},
            cp_lc_pic : {type:'image',def: '','title':'钀ヤ笟鎵х収'},
//				intro3 : {type:'intro',def: '','title':'璇峰～鍐欏鍏处鍙蜂俊鎭紝鎴戜滑鍙兘闅忔満杞叆灏忕瑪閲戦鐢ㄤ簬楠岃瘉锛屽悗缁渶鐢宠浜哄憡鐭ヨ浆璐﹂噾棰濆畬鎴愭牎鏍�'},
//				cp_bk_name : {type:'input',def: '','title':'瀵瑰叕閾惰鍚嶇О'},
//				cp_bk_account : {type:'input',def: '','title':'瀵瑰叕璐﹀彿'},
            intro1 : {type:'intro',def: '','title':'<a style="text-decoration: underline;" target="_blank" href="/Public/file/xpgman_apply.pdf">鐐瑰嚮涓嬭浇鐢宠鍏嚱</a>'},
            apply_pic : {type:'image',def: '','title':'鐢宠鍏嚱'},
            intro2 : {type:'intro',def: '','title':'浠ヤ笂鐢宠鍏嚱璇锋墦鍗板姞鐩栧叕绔犲～鍐欎俊鎭悗鎷嶇収涓婁紶'},
//				lp_id_a : {type:'image',def: '','title':'鐢宠浜鸿韩浠借瘉姝ｉ潰'},
//				lp_id_b : {type:'image',def: '','title':'鐢宠浜鸿韩浠借瘉鍙嶉潰'},
            lp_name : {type:'input',def: '','title':'鐢宠浜哄悕瀛�'},
            lp_phone : {type:'input',def: '','title':'鐢宠浜烘墜鏈哄彿'},
            wrap_end1:{type:'wrap_end'},
            wrap_0:{self_class:'myid_0 togglebox myopehide',type:'wrap_start'},
            gr_name : {type:'input',def: '','title':'鍚嶅瓧'},
            gr_id_a : {type:'image',def: '','title':'韬唤璇佹闈�'},
            gr_id_b : {type:'image',def: '','title':'韬唤璇佸弽闈�'},
            gr_phone : {type:'input',def: '','title':'鎵嬫満鍙�'},
            wrap_end0:{type:'wrap_end'},
            introay : {type:'intro',def: '','title':'鎵舵寔瀹炰綋灏忓井浼佷笟锛岀敵璇峰厤璐瑰崌绾ч珮绾т紒涓氱敤鎴凤紝鍚嶉鏈夐檺锛屽鏈€氳繃鍙兘鍚嶉宸叉弧'},
            apply_free : {data:[{v:1,s:'鍏嶈垂鐢宠'}],type:'tag_select',def: '','title':'鐢宠鍏嶈垂鍗囩骇'},
        };
        var param={
            'where_val':'',
            'where_key':'id',
            'title':'韬唤楠岃瘉',
            'url':'/home/user/id_check',


        }

        param.callback=function(p){

        };
        my_pop_ope.create_form(aft,param);
    }

    lk.id_check = id_check ;
})();

(function(){

    pubrun=function(){


    }
    pubrun.prototype.init=function(){

        $('.js-mycopy').click(function(){
            var btn=$(this);
            $.post('/home/mockup/clone_mockup',{'auth':wefwe(),'id':$(this).attr('data-id')},function(d){
                if(d.status){
                    window.location.href=d.skip;
                }else{
                    $.alert(d.msg);
                }
            },'json');
        });

        $('.js_to_edit').click(function(){
            var href=$(this).attr('data-href');
            $.confirm({
                content: '璇ユā鏉垮凡缁忎笂绾匡紝鍐嶆缂栬緫鍚庨渶瀹℃牳閫氳繃鎵嶈兘鏇存柊锛岀‘璁ょ紪杈戝悧锛�',
                confirm: function(){
                    window.location.href=href;
                }
            });
        });

        $('.js-myfavmk').click(function(){
            var btn=$(this);
            $.post('/home/user/addfav',{'auth':wefwe(),'id':$(this).attr('data-id')},function(d){
                if(d.status){
                    btn.html('鏀惰棌鎴愬姛');
                }else{
                    $.alert(d.msg);
                }
            },'json');
        });

        $('.js-mydelmk').click(function(){
            var btn=$(this);

            $.confirm({
                content: '鏄惁鍒犻櫎褰撳墠妯℃澘? (鍒犻櫎鍚庝笉鍙仮澶�)',
                confirm: function(){
                    $.post('/home/user/delmock',{'auth':wefwe(),'id':btn.attr('data-id')},function(d){
                        if(d.status){
                            window.location.reload();
                        }else{
                            $.alert(d.msg);
                        }
                    },'json');
                }
            });
        });

        $('.js-myunpubmk').click(function(){
            var btn=$(this);

            $.confirm({
                content: '鏄惁鍒犻櫎褰撳墠妯℃澘锛屽垹闄ゅ悗涓嶅彲鎭㈠?',
                confirm: function(){
                    $.post('/home/user/unpub',{'auth':wefwe(),'id':btn.attr('data-id')},function(d){
                        if(d.url){
                            window.location.href=d.url;
                        }else{
                            $.topmsg(d.msg);
                        }
                    },'json');
                }
            });

        });


        $('.js_myatcback').click(function(){

            $('#myatcboxs').fadeOut();

        });

        if($('.user_bind_phone_email').length>1 && localStorage.getItem('notice_bind')!='1'){
            $.alert('涓轰簡鎮ㄧ殑璐﹀彿瀹夊叏锛岃缁戝畾鎮ㄧ殑閭鍙锋垨鑰呮墜鏈哄彿锛屽惁鍒欏彂甯冧俊鎭彲鑳藉鏍稿け璐�!');
            localStorage.setItem('notice_bind','1');
        }

        $('.js-free-apply').click(function(){

            $.alert('鎮ㄥ湪鏈珯娉ㄥ唽鎴愬姛鍚庯紝缁戝畾鎵嬫満鍙锋垨鑰呴偖绠卞彿锛屽湪鐢ㄦ埛涓績鈥滄垜鐨勮韩浠解€濋噷濉啓璧勬枡锛屽苟鍕鹃€夊厤璐硅瘯鐢ㄥ悗鎻愪氦韬唤楠岃瘉锛屽悕棰濇湁闄愶紝绉戞妧绫伙紝瀹炰綋浜т笟绫伙紝灏忓井浼佷笟锛屽伐浣滃浼樺厛锛�');

        });

        function setTipText(){
            var text = '鍗囩骇涓�...';
            $('#mysstiptext').text(text);
        }
        $('.js_myscc').click(function(){
            $('#mysstip').show();
            setTipText();
        })
        $('.js_myscc').hover(function(){
            $('#mysstip').show();
            setTipText();
        },function(){})

        function GetQueryString(name){
            var reg=eval("/"+name+"/g");
            var r = window.location;
            var flag=reg.test(r);
            if(flag){
                return true;
            }else{
                return false;
            }
        }

        $('.myclosecctip').click(function(){
            $('#mysstip').hide();
        })
        $('#mysstip').hover(function(){
        },function(){$('#mysstip').hide();})

        if(GetQueryString("colorshow") || GetQueryString("privacy")  || !GetQueryString("home") || GetQueryString("demo")  ){
            $('#mysstipbox').hide();
        }else{
            $('#mysstipbox').show();
        }
    }

    lk.pubrun = pubrun ;
})();
var pubrun=new pubrun();
pubrun.init();
