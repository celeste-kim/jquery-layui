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
		$.get(baseURL+'/CustomerService/findAll',function(response){
			var data = response.data
			data.forEach(function(item){
					arr1.push(item.status)
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
			status:val
		}
		$('#customer_tbody').empty();
		$.get(baseURL+'/CustomerService/findByEducation',obj,function(res){
			data = res.data;
			console.log(res.data);
			res.data.forEach(function(item,index){
				var newTr = $(`<tr>
					<td><input type="checkbox" value="`+item.id+`" name="#user_id"/></td>
					<td>`+item.username+`</td>
					<td>`+item.realname+`</td>
					<td>`+item.gender+`</td>
					<td>`+item.status+`</td>
					<td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    </td></tr>`);
				$('#customer_tbody').append(newTr);
			})
		})
	})
	$('#three').change(function(){
		var val = $(this).val();
		console.log(val);
		var obj = {
			gender:val
		}
		$('#customer_tbody').empty();
		$.get(baseURL+'/CustomerService/findByGender',obj,function(res){
			data = res.data;
			console.log(res.data);
			res.data.forEach(function(item,index){
				var newTr = $(`<tr>
					<td><input type="checkbox" value="`+item.id+`" name="#user_id"/></td>
					<td>`+item.username+`</td>
					<td>`+item.realname+`</td>
					<td>`+item.gender+`</td>
					<td>`+item.status+`</td>
					<td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    </td></tr>`);
				$('#customer_tbody').append(newTr);
			})
		})
	})
	//筛选结束
	//查询开始
	$('#btn_search').on('click',function(){
		var pattern = new RegExp($('#inp').val(),'ig');
		//将tbody清空
		$('#customer_tbody').empty();		
		$.get(baseURL+'/CustomerService/findAll',function(res){
			res.data.forEach(function(item,index){
				console.log(item);
				if(pattern.test(item.status)){
					var newTr = $(`<tr>
					<td><input type="checkbox" value="`+item.id+`" name="#user_id"/></td>
					<td>`+item.username+`</td>
					<td>`+item.realname+`</td>
					<td>`+item.gender+`</td>
					<td>`+item.status+`</td>
					<td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    </td></tr>`);
				$('#customer_tbody').append(newTr);
				}
			})
		})
	})
	//查询结束
	//让模态框显示
	$('#fb').on('click',function(){
		$('.modal-body input').val("");
		$('#myModal').modal('show');
	})
	//保存
	$('.main').on({click:function(){
		var url = baseURL+'/CustomerService/saveOrUpdate';
		var id = $('input[name=id]').val();
		var username =$('input[name=username]').val();
		var realname =$('input[name=realname]').val();
		//判断男女
		var gender = $('#gender').val();
		var status = '';
		console.log(gender);
		var data ={
			id:id,
			username:username,
			realname:realname,
			gender:gender,
			status:status
		}
		$.post(url,data,function(response){
			reloadData();
			console.log(response);
		})
		//让模态框提交后自动关闭
		$("#myModal").modal('hide');
		$('.modal-body input').val("");
	}},'#customer_sub')
	//保存结束
	//删除开始
	$('#customer_tbody').on('click','.btn_del',function(){
			var url = baseURL+'/CustomerService/deleteById';
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
	})
	//删除结束
	//重载数据
	function reloadData(){
		var url = baseURL+"/CustomerService/findAll";
		//将tbody清空
		$('#customer_tbody').empty();
		$.get(url,function(res){
			res.data.forEach(function(item){
				var newTr = $(`<tr>
					<td><input type="checkbox" value="`+item.id+`" name="#user_id"/></td>
					<td>`+item.username+`</td>
					<td>`+item.realname+`</td>
					<td>`+item.gender+`</td>
					<td>`+item.status+`</td>
					<td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    </td></tr>`);
				$('#customer_tbody').append(newTr);
			})
		})
	}
//重载数据结束
})