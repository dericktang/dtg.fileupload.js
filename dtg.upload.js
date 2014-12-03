/*!
 * dtg.upload.js ~ Copyright (c) 2014 dericktang, https://github.com/dericktang/dtg.upload.js
 * Released under MIT license
 */
(function($) {
	  /**
	   * $.ajaxUpload({data:[text],file:[file],url:'/dtg.dialog.js/blob/master/dtg.dialog.js',success:function(result){alert(result)},error:function(e){alert(e)}});
	   * file:input
	   * data:input
	   * url:url
	   * success
	   * error
	   */
	  $.ajaxUpload = function(options){
		  //设置上传超时时间
		  //解析options;
		  var param,file,url,success,error,beforeSend,complete;
		  var date = new Date();
		  var id = date.getTime();
		  if(options != undefined){
			  if(options.data != undefined){
				  param = options.data;  
			  }
			  if(options.file != undefined){
				  file = options.file;  
			  }
			  if(options.url != undefined){
				  url = options.url;  
			  }
			  if(options.success != undefined){
				  success = options.success;  
			  }
			  if(options.error != undefined){
				  error = options.error;  
			  }
			  if(options.beforeSend != undefined){
				  beforeSend = options.beforeSend;
			  }
			  if(options.complete != undefined){
				  complete = options.complete;
			  }
			  var iframe  = document.createElement('iframe');
			  $(iframe).attr("id","iframe"+id);
			  $(iframe).attr("name","iframe"+id);
			  $(iframe).css({display:'none'});
			  var isFirst = true;
			  iframe.onload = function() {
				  if(isFirst){
					  isFirst=false;
				  }else{
					  callback(success,"iframe"+id,error);
				  }
              } 
			  var form =  document.createElement('form');
			  $(form).attr("id","form"+id);
			  $(form).attr("enctype","multipart/form-data");
			  $(form).attr("method","post");
			  $(form).attr("action",url);
			  $(form).attr("target","iframe"+id);
			  $(form).css({display:'none'});
			  for(var i in param){
				  var obj =  $(param[i]);
				  appendInput(form,obj);
			  }
			  for(var i in file){
				  var obj =  $(file[i]);
				  appendInput(form,obj);
			  }
			  
			  document.body.appendChild(iframe);
			  document.body.appendChild(form);
		  }
		  $(form).submit();
		  return true;
	  }
	  
	  var callback = function(success,id,error){
		  try{
		      var html = document.getElementById(id).contentWindow.document.body.innerText;
		      if(success != undefined)
		        success(html);
		  }catch(e){
			  if(error != undefined)
			    error('fail');
		  }
	  }
	  
	  var appendInput = function(form,obj){
		  var input = document.createElement('input');
		  addAttr(input,obj);
		  form.appendChild(input);
	  }
	  
	  var addAttr = function(newObj,obj){
		  $(newObj).attr("type",obj.attr("type"));
		  $(newObj).attr("name",obj.attr("name"));
		  $(newObj).attr("value",obj.val());
	  }
	  
})($);