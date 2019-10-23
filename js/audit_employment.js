$(function(){
	reloadData();
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
		$.get(baseURL+'/Employment/findAll',function(response){
			var data = response.data
			data.forEach(function(item){
				if(item.auditStatus=='审核通过'){
						arr1.push(item.job)
						arr2.push(item.job)
						arr3.push(item.businessId)
				}
			})
			arr1 = uniq(arr1)
			arr1.forEach(function(item){
				$('<option value='+item+'>'+item+'</option>').appendTo('#two')
			})
		})
	}
	addoption()
	//点击通过
	$('#business_tbody1').on('click','button.pass',function(){
		//获取id
		var id = $(this).parents('tr').children().eq(0).find('input').val();
		console.log(id);
		var data ={
			id:id
		}
		$('#business_tbody1').empty();
		var url = baseURL+'/Employment/findById';
		$.get(url,data,function(res){
			res.data.status ='审核通过';
			var data1 =res.data;
			$.post(baseURL+'/Employment/saveOrUpdate',data1,function(response){
				if(response.status === 200){
					message('修改成功！');
					reloadData();
				}else{
					message('修改失败！');
				}
			})
		})
		
	})
	//点击拒绝
	$('#business_tbody1').on('click','button.refuse',function(){
		//获取id
		var id = $(this).parents('tr').children().eq(0).find('input').val();
		console.log(id);
		var data ={
			id:id
		}
		$('#business_tbody1').empty();
		var url = baseURL+'/Employment/findById';
		$.get(url,data,function(res){
			console.log(res.data.status);
			res.data.status ='拒绝';
			var data1 =res.data;
			$.post(baseURL+'/Employment/saveOrUpdate',data1,function(response){
				if(response.status === 200){
					message('修改成功！');
					reloadData();
				}else{
					message('修改失败！');
				}
			})
		})
		
	})
//筛选开始
	$('#two').change(function(){
		var val = $(this).val();
		console.log(val);
		var obj = {
			job:val
		}
		$('#employment_tbody1').empty();
		$(`<tr>
			  	<th>#</th>
			  	<th>招聘标题</th>
			  	<th>发布人</th>
			  	<th>联系电话</th>
			  	<th>职位</th>
			  	<th>发布时间</th>
			  	<th>详情</th>
			  	<th>操作</th>
		  	</tr>`).appendTo($('tbody'))
		//当筛选条件为全部的时候
		if(val=='all'){
			reloadData();
		}
		$.get(baseURL+'/Employment/findByJob',obj,function(res){
			data = res.data;
			console.log(res.data);
			res.data.forEach(function(item,index){
				var newTr = $(`<tr><td>
					<input type="checkbox" value="`+item.id+`" name="#employment_id" /></td>
				    <td>`+item.title+`</td>
				    <td>`+item.contactName+`</td>
				    <td>`+item.contactPhone+`</td>
				    <td>`+item.job+`</td>
				    <td>`+dateParse(item.publishTime)+`</td>
				    <td>
				    <a href="javascript:void(0)" class="btn_details">查看</a>
				    </td>
				    <td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    <a href="javascript:void(0)" class="btn_upd"><i class="fa fa-edit"></i></a></td></tr>`);
					$('#employment_tbody1').append(newTr);
			})
		})
	})
//筛选结束
	//查询
	$('#btn_search').on('click',function(){
		var pattern = new RegExp($('#inp').val(),'ig');
		var url = baseURL+'/Employment/findAll';
		//将tbody1清空
		$('#employment_tbody1').empty();
		$(`<tr>
			  	<th>#</th>
			  	<th>招聘标题</th>
			  	<th>发布人</th>
			  	<th>联系电话</th>
			  	<th>职位</th>
			  	<th>发布时间</th>
			  	<th>详情</th>
			  	<th>操作</th>
		  	</tr>`).appendTo($('tbody'))
		$.get(url,function(res){
			res.data.forEach(function(item,index){
				if(pattern.test(item.title)){
					var newTr = $(`<tr><td>
					<input type="checkbox" value="`+item.id+`" name="#employment_id" /></td>
				    <td>`+item.title+`</td>
				    <td>`+item.contactName+`</td>
				    <td>`+item.contactPhone+`</td>
				    <td>`+item.job+`</td>
				    <td>`+dateParse(item.publishTime)+`</td>
				    <td>
				    <a href="javascript:void(0)" class="btn_details">查看</a>
				    </td>
				    <td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    <a href="javascript:void(0)" class="btn_upd"><i class="fa fa-edit"></i></a></td></tr>`);
					$('#employment_tbody1').append(newTr);
				}
			})
		})
	})
	//查询结束
	//重载数据
	function reloadData(){
		var url = baseURL+"/Employment/findAll";
		//将tbody清空
		$('#employment_tbody1').empty();
		$('tbody tr:not(:first)').empty();
		$(`<tr>
		  	<th>#</th>
		  	<th>招聘标题</th>
		  	<th>发布人</th>
		  	<th>联系电话</th>
		  	<th>职位</th>
		  	<th>发布时间</th>
		  	<th>详情</th>
		  	<th>操作</th>
	  	</tr>`).appendTo($('tbody'))
		$.get(url,function(res){
			res.data.forEach(function(item){
				console.log(item.auditStatus);
				if(item.auditStatus=='拒绝'){
					$(`
					<tr>
				  	<td><input type="checkbox" value=`+item.id+`></td>
				  	<td>`+item.title+`</td>
				  	<td>`+item.contactName+`</td>
				  	<td>`+item.contactPhone+`</td>
				  	<td>`+item.job+`</td>
				  	<td>`+dateParse(item.publishTime)+`</td>
		
				  	<td><a href="#" class="dec">查看</a></td>
				  	<td style="color:red;">已拒绝</td>
				  	</tr>
					`).appendTo('#employment_tbody1')
				}else if(item.auditStatus=='审核通过'){
					$(`
					<tr>
				  	<td><input type="checkbox" value=`+item.id+`></td>
				  	<td>`+item.title+`</td>
				  	<td>`+item.contactName+`</td>
				  	<td>`+item.contactPhone+`</td>
				  	<td>`+item.job+`</td>
				  	<td>`+dateParse(item.publishTime)+`</td>
		
				  	<td><a href="#" class="dec">查看</a></td>
				  	<td style="color:green;">审核通过</td>
				  	</tr>
					`).appendTo('#employment_tbody1')
				}else if(item.auditStatus=='未审核'){
					$(`
					<tr>
				  	<td><input type="checkbox" value=`+item.id+`></td>
				  	<td>`+item.title+`</td>
				  	<td>`+item.contactName+`</td>
				  	<td>`+item.contactPhone+`</td>
				  	<td>`+item.job+`</td>
				  	<td>`+dateParse(item.publishTime)+`</td>
		
				  	<td><a href="#" class="dec">查看</a></td>
				  	<td><button type="button" class="btn btn-sm btn-success pass">通过</button>
							<button type="button" class="btn btn-sm btn-danger refuse" >拒绝</button></td>
				  	</tr>
					`).appendTo('#employment_tbody1')
				}
				
			})
		})
	}
//重载数据结束
})