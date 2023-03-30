var lk = lk || {};

(function(){

    myatc=function(){
        this.ht = document.documentElement.clientHeight  ;
        this.wt = document.body.clientWidth ;
        var maxwt = 500;

        var tpl='<div id="myatcboxs" class="mynicescroll" style="display:none;position: fixed;top: 0;width: 100%;z-index: 99999999;overflow-y: scroll;">'+
            '<div class="myactbox_center_box" style="width:'+(this.wt>=maxwt?75:100)+'%;border-radius: 5px;top:'+(this.wt>=maxwt?15:0)+'px;position:relative;margin:auto;min-height: 150px;background-color: #fff;box-shadow:0 0 2px rgba(0, 0, 0, 0.55), 0 2px 4px rgba(0, 0, 0, 0.28);" >'+
            (this.wt>=maxwt?'<div id="myatcback" class="js_myatcback" style="position:absolute;top:20px;right:35px;text-align: center;cursor: pointer;font-size:40px;">脳</div>':'<div id="myatcback" class="js_myatcback" style="position:fixed;top:0px;right:0px;text-align: center;cursor: pointer;font-size:25px;opacity:0.7;">脳</div>')+
            '<div class="myactbox_center_ct_box" style="width: '+(this.wt>=maxwt?95:100)+'%;margin: auto;">'+
            '<div class="mycomtit" style="padding: 15px 0px;width: 100%;font-size: 24px;font-weight: 600;color:#333;">鍔犺浇涓€傘€傘€�</div>'+
            '<div class="mytagsay" style="width:100%;">'+
            '<div style="float:left;color:#666;" id="myatc_time"></div><div style="margin-left:15px;cursor:pointer;float:left;color:#666;" id="myatcfull">100%瀹藉睆娴忚</div>'+
            '<div style="float:right;color:#666;margin-top:15px;" id="myatc_tags"></div>'+
            '<div style="clear:both;"></div>'+
            '</div>'+
            '<div class="mycomcontent" style="color:#555;border-top: 1px #ececec solid;padding: 15px 0;min-height: 260px;margin-top:15px;" >鍔犺浇涓�...</div>'+
            '<div style="height:100px;padding-top:25px;border-top: 2px #ececec solid;"><a class="js_myatcback" style="float:right;color:#333;font-size:18px;" href="javascript://">杩斿洖 &nbsp;&nbsp;</a><div style="clear:both;"></div></div>'+
            '</div>'+
            '</div>'+
            //	'<div style="height:200px;text-align:right;">杩斿洖</div>'+
            //	'<div id="myatcback" class="js_myatcback" style="position: fixed;right: 50px;bottom: 30px;width: 60px;height: 60px;line-height: 60px;border-radius: 30px;border: 1px solid #888;color: #333;background-color: #fff;text-align: center;cursor: pointer;" >杩斿洖</div>'+
            '</div>';
        this.d=$(tpl);
    }

    myatc.prototype.bind_detail_event=function(){
        var self=this;
        $('.js_myatcback').click(function(e){
            self.d.animate({left:2*self.wt+'px'},function(){
                self.d.remove();
                window.location.hash='123';
            });
        });
        $('#myatcfull').click(function(e){
            $(".myactbox_center_box").animate({width:'100%',top:0,borderRadius:0},function(){
            });
        });
        $('.js_my_tag_list').click(function(e){
            self.d.find('.mycomtit').html($(this).text());
            self.d.find('#myatc_time').html('');

            var tag_id=$(this).attr('data-id');
            var uid=$(this).attr('data-uid');

            $.get('/home/article/ajax_tag_list',{'uid':uid,'tag_id':tag_id,'page':1},function(data){

                self.d.find('.mycomcontent').html(data);
                self.bind_list_event();
            });
        });
    }
    myatc.prototype.bind_list_event=function(href){
        var self=this;
        $('.js-my-atc-show').click(function(){

            self.pop_atc($(this).attr('data-href'));
        });

    }
    myatc.prototype.pop_atc=function(href){
        var self=this;
        self.d.remove();
        $('#myatcboxs').fadeIn();
        $.topmsg('鍔犺浇涓�...',0);
        $.getJSON('/home/article/ajax_detail',{'href':href},function(data){
            $.topmsg('').hide();
            if(!data.status){
                $.topmsg(data.msg);
            }
            var d=self.d;
            $('body').prepend(d);

            if(data.just_login_see){
                $.topmsg('璇ユ枃绔犲皻鏈鏍革紝浠呬緵鐧诲綍鐢ㄦ埛鏌ョ湅');
            }

            d.find('.mycomtit').html(data.title);
            d.find('.mycomcontent').html(data.content);

            d.find('#myatc_time').html(data.time);
            d.find('#myatc_tags').html(data.tag);

            d.css('left',-self.wt+'px');
            d.show();
            d.animate({left:"0px"});

            self.bind_detail_event();

            if($('#myatcboxs').niceScroll()!=undefined){
                $('#myatcboxs').niceScroll();
            }
        });
    }
})();
lk.myatc=new myatc();
