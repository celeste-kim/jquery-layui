$(function(){
	reloadData();
	//将模态框中的下拉列表框中数据填进去
	//数组去重
	function uniq(array){
	    var temp = []; //一个新的临时数组
	    for(var i = 0; i < array.length; i++){
	        if(temp.indexOf(array[i]) == -1){
	            temp.push(array[i]);
	        }
	    }
	    return temp;
	}
	function addoption(){
		var arr1 = []
		var arr2 = []
		var arr3 = []
		$.get(baseURL+'/Jobhunter/findAll',function(response){
			var data = response.data
			data.forEach(function(item){
					arr1.push(item.education)
					arr2.push(item.gender)
			})
			arr1 = uniq(arr1)
			arr2 = uniq(arr2)
			arr1.forEach(function(item){
				$('<option value='+item+'>'+item+'</option>').appendTo('#two')
			})
			arr2 = uniq(arr2)
			arr2.forEach(function(item){
				$('<option value='+item+'>'+item+'</option>').appendTo('#three')
			})
		})
	}
	addoption()
	//加载页面option结束
	//筛选开始
	$('#two').change(function(){
		var val = $(this).val();
		console.log(val);
		var obj = {
			education:val
		}
		$('#user_tbody').empty();
		//当筛选条件为全部的时候
		if(val=='all'){
				reloadData();
		}
		$.get(baseURL+'/Jobhunter/findByEducation',obj,function(res){
			data = res.data;
			console.log(res.data);
			res.data.forEach(function(item,index){
				var newTr = $(`<tr>
					<td><input type="checkbox" value="`+item.id+`" name="#user_id"/></td>
					<td>`+item.username+`</td>
					<td>`+item.realname+`</td>
					<td>`+item.telephone+`</td>
					<td>`+item.gender+`</td>
					<td>`+item.birth+`</td>
					<td>`+item.education+`</td>
					<td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    <a href="javascript:void(0)" class="btn_upd"><i class="fa fa-edit"></i></a></td></tr>`);
					$('#user_tbody').append(newTr);
			})
		})
	})
	$('#three').change(function(){
		var val = $(this).val();
		console.log(val);
		var obj = {
			gender:val
		}
		$('#user_tbody').empty();
		$.get(baseURL+'/Jobhunter/findByGender',obj,function(res){
			data = res.data;
			console.log(res.data);
			res.data.forEach(function(item,index){
				var newTr = $(`<tr>
					<td><input type="checkbox" value="`+item.id+`" name="#user_id"/></td>
					<td>`+item.username+`</td>
					<td>`+item.realname+`</td>
					<td>`+item.telephone+`</td>
					<td>`+item.gender+`</td>
					<td>`+item.birth+`</td>
					<td>`+item.education+`</td>
					<td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    <a href="javascript:void(0)" class="btn_upd"><i class="fa fa-edit"></i></a></td></tr>`);
					$('#user_tbody').append(newTr);
			})
		})
	})
	//筛选结束
	//查询开始
	$('#btn_search').on('click',function(){
		var pattern = new RegExp($('#inp').val(),'ig');
		//将tbody清空
		$('#user_tbody').empty();		
		$.get(baseURL+'/Jobhunter/findAll',function(res){
			res.data.forEach(function(item,index){
				console.log(item);
				if(pattern.test(item.education)){
					var newTr = $(`<tr>
					<td><input type="checkbox" value="`+item.id+`" name="#user_id"/></td>
					<td>`+item.username+`</td>
					<td>`+item.realname+`</td>
					<td>`+item.telephone+`</td>
					<td>`+item.gender+`</td>
					<td>`+item.birth+`</td>
					<td>`+item.education+`</td>
					<td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    <a href="javascript:void(0)" class="btn_upd"><i class="fa fa-edit"></i></a></td></tr>`);
					$('#user_tbody').append(newTr);
				}
				if(pattern.test(item.gender)){
					var newTr = $(`<tr>
					<td><input type="checkbox" value="`+item.id+`" name="#user_id"/></td>
					<td>`+item.username+`</td>
					<td>`+item.realname+`</td>
					<td>`+item.telephone+`</td>
					<td>`+item.gender+`</td>
					<td>`+item.birth+`</td>
					<td>`+item.education+`</td>
					<td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    <a href="javascript:void(0)" class="btn_upd"><i class="fa fa-edit"></i></a></td></tr>`);
					$('#user_tbody').append(newTr);
				}
				if(pattern.test(item.id)){
					var newTr = $(`<tr>
					<td><input type="checkbox" value="`+item.id+`" name="#user_id"/></td>
					<td>`+item.username+`</td>
					<td>`+item.realname+`</td>
					<td>`+item.telephone+`</td>
					<td>`+item.gender+`</td>
					<td>`+item.birth+`</td>
					<td>`+item.education+`</td>
					<td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    <a href="javascript:void(0)" class="btn_upd"><i class="fa fa-edit"></i></a></td></tr>`);
					$('#user_tbody').append(newTr);
				}
				if(pattern.test(item.username)){
					var newTr = $(`<tr>
					<td><input type="checkbox" value="`+item.id+`" name="#user_id"/></td>
					<td>`+item.username+`</td>
					<td>`+item.realname+`</td>
					<td>`+item.telephone+`</td>
					<td>`+item.gender+`</td>
					<td>`+item.birth+`</td>
					<td>`+item.education+`</td>
					<td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    <a href="javascript:void(0)" class="btn_upd"><i class="fa fa-edit"></i></a></td></tr>`);
					$('#user_tbody').append(newTr);
				}
			})
		})
	})
	//查询结束
	//保存开始	
	$('#fb').on('click',function(){
		$('.modal-body input').val("");
		$('#myModal').modal('show');
	})
	$('#user_sub').on('click',function(){
		var url = baseURL+'/Jobhunter/saveOrUpdate';
		var id = $('input[name=id]').val();
		var username =$('input[name=username]').val();
		var realname =$('input[name=realname]').val();
		var password =$('input[name=password]').val();
		var education =$('input[name=education]').val();
		//判断男女
		var gender = $('#gender').val();
		var telephone =$('input[name=telephone]').val();
		var workTime =$('input[name=workTime]').val();
		var currentStatus =$('input[name=currentStatus]').val();
		var resume =$('input[name=resume]').val();
		var data ={
			id:id,
			username:username,
			realname:realname,
			password:password,
			education:education,
			gender:gender,
			telephone:telephone,
			workTime:workTime,
			currentStatus:currentStatus,
			resume:resume
		}
		$.post(url,data,function(response){
			reloadData();
			console.log(response);
		})
		//让模态框提交后自动关闭
		$("#myModal").modal('hide');
		$('.modal-body input').val("");
	})
	//保存结束
	$('#user_tbody').on('click','a',function(){
		switch(this.className){
			//删除开始
			case 'btn_del':
			var url = baseURL+'/Jobhunter/deleteById';
			var id = $(this).parents('tr').children().eq(0).find('input').val();
			var data = 'id='+id;
			$.post(url,data,function(response){
				console.log(response);
				if(response.status==200){
					message('删除成功！');
					reloadData();
				}else{
					message('删除失败！');
				}
			})
			break;
			//删除结束
			//修改开始
			case 'btn_upd':
			$('#myModal').modal('show');
			var id = $(this).parents('tr').children().eq(0).find('input').val();
			var data1 = {
				id:id
			}
			$.get(baseURL+'/Jobhunter/findById',data1,function(response){
				console.log(response);
				$('input[name=id]').val(id);
				$('input[name=username]').val(response.data.username);
				$('input[name=realname]').val(response.data.realname);
				$('input[name=password]').val(response.data.password);
				$('input[name=education]').val(response.data.education);
				// //判断男女
				// var gender = $('#gender').val();
				$('input[name=telephone]').val(response.data.telephone);
				$('input[name=workTime]').val(response.data.workTime);
				$('input[name=currentStatus]').val(response.data.currentStatus);
				$('input[name=resume]').val(response.data.resume);

			})
			//让模态框提交后自动关闭
			$("#myModal").modal('hide');
			$('.modal-body input').val("");
			break;
			//修改结束
		}
	})
	//重载数据
	function reloadData(){
		var url = baseURL+"/Jobhunter/findAll";
		//将tbody清空
		$('#user_tbody').empty();
		$.get(url,function(res){
			res.data.forEach(function(item){
				var newTr = $(`<tr>
					<td><input type="checkbox" value="`+item.id+`" name="#user_id"/></td>
					<td>`+item.username+`</td>
					<td>`+item.realname+`</td>
					<td>`+item.telephone+`</td>
					<td>`+item.gender+`</td>
					<td>`+item.birth+`</td>
					<td>`+item.education+`</td>
					<td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    <a href="javascript:void(0)" class="btn_upd"><i class="fa fa-edit"></i></a></td></tr>`);
				$('#user_tbody').append(newTr);
			})
		})
	}
//重载数据结束







})