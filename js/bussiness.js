$(function(){
	reloadData();
	//监听select one
	$('#one').change(function(){
		var val = $(this).val();
		var obj = {
			location:val
		}
		$('#business_tbody').empty();
		//当筛选条件为全部的时候
		if(val=='all'){
				reloadData();
		}
		$.get(baseURL+'/Business/findByLocation',obj,function(res){
			data = res.data;
			res.data.forEach(function(item,index){
				var newTr = $(`<tr>
			    <td scope="row">
					<input type="checkbox" value="`+item.id+`" name="#business_id" />
			    </td>
			    <td>`+item.name+`</td>
			    <td>`+item.contactName+`</td>
			    <td>`+item.industry+`</td>
			    <td>`+item.scale+`</td>
			    <td>`+item.location+`</td>
			    <td>`+item.establishedTime+`</td>
			    <td>
			      	<a class="btn_details" href="javascript:void(0)">查看</a>
				</td>
			    <td>
					<a class="btn_del" href="javascript:void(0)">
					<i class="fa fa-trash"></i></a>&nbsp;
					<a class="btn_upd" href="javascript:void(0)">
					<i class="fa fa-edit"></i></a>&nbsp;
				</td>
			    </tr>`);
				$("#business_tbody").append(newTr);
			})
		})
	})
	//监听select two
	$('#two').change(function(){
		var val = $(this).val();
		// console.log(val);
		var obj = {
			scale:val
		}
		$('#business_tbody').empty();
		//当筛选条件为全部的时候
		if(val=='all'){
				reloadData();
		}
		$.get(baseURL+'/Business/findByScale',obj,function(res){
			data = res.data;
			res.data.forEach(function(item,index){
				var newTr = $(`<tr>
			    <td scope="row">
					<input type="checkbox" value="`+item.id+`" name="#business_id" />
			    </td>
			    <td>`+item.name+`</td>
			    <td>`+item.contactName+`</td>
			    <td>`+item.industry+`</td>
			    <td>`+item.scale+`</td>
			    <td>`+item.location+`</td>
			    <td>`+item.establishedTime+`</td>
			    <td>
			      	<a class="btn_details" href="javascript:void(0)">查看</a>
				</td>
			    <td>
					<a class="btn_del" href="javascript:void(0)">
					<i class="fa fa-trash"></i></a>&nbsp;
					<a class="btn_upd" href="javascript:void(0)">
					<i class="fa fa-edit"></i></a>&nbsp;
				</td>
			    </tr>`);
				$("#business_tbody").append(newTr);
			})
		})
	})
	//监听select three
	$('#three').change(function(){
		var val = $(this).val();
		var obj = {
			industry:val
		}
		$('#business_tbody').empty();
		//当筛选条件为全部的时候
		if(val=='all'){
				reloadData();
		}
		$.get(baseURL+'/Business/findByIndustry',obj,function(res){
			data = res.data;
			res.data.forEach(function(item,index){
				var newTr = $(`<tr>
			    <td scope="row">
					<input type="checkbox" value="`+item.id+`" name="#business_id" />
			    </td>
			    <td>`+item.name+`</td>
			    <td>`+item.contactName+`</td>
			    <td>`+item.industry+`</td>
			    <td>`+item.scale+`</td>
			    <td>`+item.location+`</td>
			    <td>`+item.establishedTime+`</td>
			    <td>
			      	<a class="btn_details" href="javascript:void(0)">查看</a>
				</td>
			    <td>
					<a class="btn_del" href="javascript:void(0)">
					<i class="fa fa-trash"></i></a>&nbsp;
					<a class="btn_upd" href="javascript:void(0)">
					<i class="fa fa-edit"></i></a>&nbsp;
				</td>
			    </tr>`);
				$("#business_tbody").append(newTr);
			})
		})
	})
	//删除
	//有些不能删，有外键约束
	$('#business_tbl').on('click','a',function(event){
		switch(this.className){		
			case 'btn_del':
			//获取当前行的id
			var id = $(this).parents('tr').children().eq(0).find('input').val();
			var data = "id="+id;
			var url = baseURL+'/Business/deleteById';
			$.post(url,data,function(response){
				if(response.status === 200){
					message('删除成功！');
					reloadData();
				}else{
					message('删除失败！');
				}
			})
			break;
			case 'btn_upd':
			$('#myModal').modal('show');
			var id = $(this).parents('tr').children().eq(0).find('input').val();
			$('input[name=id]').val(id);
			$('input[name=name]').val($(this).parents('tr').children().eq(1).text());
			$('input[name=industry]').val($(this).parents('tr').children().eq(2).text());
			$('input[name=location]').val($(this).parents('tr').children().eq(3).text());
			$('input[name=contactName]').val($(this).parents('tr').children().eq(4).text());
			$('input[name=contactPhone]').val($(this).parents('tr').children().eq(5).text());		
			$('input[name=scale]').val($(this).parents('tr').children().eq(6).text());		
			break;
			case 'btn_details':
			//使详情模态框显示
			$('#myModal1').modal('show');
			var id = $(this).parents('tr').children().eq(0).find('input').val();
			var obj ={
				id:id
			}
			//通过id查找需要的信息
			$.get(baseURL+'/Business/findById',obj,function(res){
				console.log(res.data);
				$('.name').text(res.data.name);
				$('.scale').text(res.data.scale);
				$('.industry').text(res.data.industry);
				$('.establishedTime').text(res.data.establishedTime);
				$('.registeredCapital').text(res.data.registeredCapital);
				$('.description').text(res.data.description);
			})
			break;
		}
	})
	//删除结束
	//修改开始
	$('#address_sub').click(
		function(){
		var url = baseURL+'/Business/saveOrUpdate';
		var id = $('input[name=id]').val();
		var data ={
			id:id
		}
		var name = $('input[name=name]').val();
		var industry = $('input[name=industry]').val();
		var location = $('input[name=location]').val();
		var contactName = $('input[name=contactName]').val();
		var contactPhone = $('input[name=contactPhone]').val();
		var scale = $('input[name=scale]').val();
		$.get(baseURL+'/Business/findById',data,function(res){
			console.log(res.data);
			res.data.name = name;
			res.data.industry = industry;
			res.data.location = location;
			res.data.contactName = contactName;
			res.data.contactPhone = contactPhone;
			res.data.scale = scale;
			var data1 = res.data;
			$.post(url,data1,function(res){
				message('更新成功！');
				reloadData();
			})
		})
		//让模态框提交后自动关闭
		$("#myModal").modal('hide');
		$('.modal-body input').val("");
	})
	//修改结束
	//加载数据
	function reloadData(){
		var url = baseURL+"/Business/findAll";
		//将tbody清空
		$('#business_tbody').empty();
		$.get(url,function(res){		
			//追加新的值
			data = res.data;
			// loadOption();
			res.data.forEach(
				function(item){
					if(item.status=='审核通过'){
						var newTr = $(`<tr>
					    <td scope="row">
							<input type="checkbox" value="`+item.id+`" name="#business_id" />
					    </td>
					    <td>`+item.name+`</td>
					    <td>`+item.contactName+`</td>
					    <td>`+item.contactPhone+`</td>
					    <td>`+item.industry+`</td>
					    <td>`+item.location+`</td>
					    <td>`+item.scale+`</td>
					    <td>
					      	<a class="btn_details" href="javascript:void(0)">查看</a>
						</td>
					    <td>
							<a class="btn_del" href="javascript:void(0)">
							<i class="fa fa-trash"></i></a>&nbsp;
							<a class="btn_upd" href="javascript:void(0)">
							<i class="fa fa-edit"></i></a>&nbsp;
						</td>
					    </tr>`);
						$("#business_tbody").append(newTr);
					}
			})
		})
	}
	//加载数据结束
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
		$.get(baseURL+'/Business/findAll',function(response){
			var data = response.data
			data.forEach(function(item){
				if(item.status == '审核通过'){
					arr1.push(item.location)
					arr2.push(item.scale)
					arr3.push(item.industry)
				}	
			})
			arr1 = uniq(arr1)
			arr1.forEach(function(item){
				$('<option value='+item+'>'+item+'</option>').appendTo('#one')
			})
			arr2 = uniq(arr2)
			arr2.forEach(function(item){
				$('<option value='+item+'>'+item+'</option>').appendTo('#two')
			})
			arr3 = uniq(arr3)
			arr3.forEach(function(item){
				$('<option value='+item+'>'+item+'</option>').appendTo('#three')
			})
		})
	}
	addoption()
	//加载页面option结束
})

