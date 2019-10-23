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
		$.get(baseURL+'/Employment/findAll',function(response){
			var data = response.data
			data.forEach(function(item){
				if(item.auditStatus=='审核通过'){
					if(item.status == '招聘中'){
						arr1.push(item.job)
						arr2.push(item.job)
						arr3.push(item.businessId)
					}
				}
			})
			arr1 = uniq(arr1)
			arr2 = uniq(arr2)
			arr3 = uniq(arr3)
			arr1.forEach(function(item){
				$('<option value='+item+'>'+item+'</option>').appendTo('#two')
			})
			arr2.forEach(function(item){
				$('<option value='+item+'>'+item+'</option>').appendTo('#three')
				$('<option value='+item+'>'+item+'</option>').appendTo('#five')
			})
			arr3.forEach(function(item){
				$('<option value='+item+'>'+item+'</option>').appendTo('#four')
				$('<option value='+item+'>'+item+'</option>').appendTo('#six')
			})
		})
	}
	addoption()
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
			// loadOption();
			res.data.forEach(function(item,index){
				if(item.status == '招聘中'){
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
//筛选结束
	//查询
	$('#btn_search').on('click',function(){
		var pattern = new RegExp($('#inp').val(),'ig');
		var url = baseURL+'/Employment/findAll';
		//将tbody1清空
		$('#employment_tbody1').empty();
		//追加表头
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
				if(item.auditStatus=='审核通过'){
					if(item.status=='招聘中'){
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
					}
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
	$('#employment_sub').on('click',function(){
		var url = baseURL+'/Employment/saveOrUpdate';
		var title = $('input[name=title]').val()
		var businessId = $('#four').val()
		var num = $('input[name=num]').val();
		var job = $('#three').val();
		var salary = $('input[name=salary]').val()
		var welfare = $('input[name=welfare]').val()
		var description = $('input[name=description]').val()
		var status = $('input[name=status]').val()
		var workingHours = 1
		var contactName = 1
		var contactPhone = 1
		var auditStatus = ''
		var jobId = 1
		var obj = {
				title:title,
				businessId:businessId,
				num:num,
				job:job,
				salary:salary,
				welfare:welfare,
				description:description,
				status:status,
				workingHours:workingHours,
				contactName:contactName,
				contactPhone:contactPhone,
				auditStatus:auditStatus
				// jobId:jobId
		}
		$.post(url,obj,function(response){
			reloadData();
			console.log(response);
		})
		//让模态框提交后自动关闭
		$("#myModal").modal('hide');
		$('.modal-body input').val("");
	})
	//保存结束
	$('#employment_tbody1').on('click','a',function(){
		switch(this.className){
			//删除开始
			//有些有外键约束无法删除
			case 'btn_del':
			var url = baseURL+'/Employment/deleteById';
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
			$('#updModal').modal('show');
			var id = $(this).parents('tr').children().eq(0).find('input').val();
			// console.log(id);
			var data1 = {
				id:id
			}
			$.get(baseURL+'/Employment/findById',data1,function(response){
				console.log(response.data.title);
				$('input[name=id]').val(id);
				$('input[name=name]').val(response.data.title);
				$('input[name=num]').val(response.data.num);
				$('input[name=salary]').val(response.data.salary);
				$('input[name=welfare]').val(response.data.welfare);
				$('input[name=status]').val(response.data.status);
				$('input[name=description]').val(response.data.description);

			})
			//让模态框提交后自动关闭
			$("#updModal").modal('hide');
			$('.modal-body input').val("");
			break;
			//修改结束
			//详情开始
			case 'dec':
			$('#myModal1').modal('show');
			var id = $(this).parents('tr').children().eq(0).find('input').val();
			var data1 = {
				id:id
			}
			$.get(baseURL+'/Employment/findById',data1,function(res){
				console.log(res.data.title);
				$('.name').text(res.data.title);
				$('.salary').text(res.data.salary);
				$('.num').text(res.data.num);
				$('.workingHours').text(res.data.workingHours);
				$('.city').text(res.data.city);
				$('.welfare').text(res.data.welfare);
				$('.businessId').text(res.data.businessId);
				$('.description').text(res.data.description);

			})
			break;
			//详情结束
		}
	})
	//修改开始
	$('#employment_sub2').on('click',function(){
		// var url = baseURL+'/Employment/saveOrUpdate';
		var title = $('input[name=name]').val()
		var id =$('input[name=id]').val();
		var num = $('input[name=num]').val()
		var job = $('#five').val()
		var businessId = $('#six').val()
		var salary = $('input[name=money]').val()
		var welfare = $('input[name=tabs]').val()
		var description = $('input[name=desc]').val()
		var status = $('input[name=status]').val()
		var data ={
			id:id
		}
		$.get(baseURL+'/Employment/findById',data,function(res){
			contactName = res.data.contactName;
			contactPhone = res.data.contactPhone;

			city = res.data.city;
			province = res.data.province;
			auditStatus = res.data.auditStatus;
			var data2 ={
				title:title,
				id:id,
				num:num,
				job:job,
				businessId:businessId,
				salary:salary,
				welfare:welfare,
				description:description,
				status:status,
				contactName:contactName,
				contactPhone:contactPhone,
				city:city,
				province:province,
				auditStatus:auditStatus
			}
			$.post(baseURL+'/Employment/saveOrUpdate',data2,function(response){
				// alert(1);
				message('更新成功！');
				reloadData();
				console.log(response);
			})
		})
		
		//让模态框提交后自动关闭
		$("#updModal").modal('hide');
		$('.modal-body input').val("");
	})
	//修改结束
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
				// 判断是否审核通过
				if(item.auditStatus=='审核通过'){
					if(item.status=='招聘中'){
						$(`
						<tr>
					  	<td><input type="checkbox" value=`+item.id+`></td>
					  	<td>`+item.title+`</td>
					  	<td>`+item.contactName+`</td>
					  	<td>`+item.contactPhone+`</td>
					  	<td>`+item.job+`</td>
					  	<td>`+dateParse(item.publishTime)+`</td>
					  	<td><a href="#" class="dec">查看</a></td>
					  	<td><a href="javascript:void(0)" class="btn_del"><i class="fa fa-trash"></i></a>
				    		<a href="javascript:void(0)" class="btn_upd"><i class="fa fa-edit"></i></a></td>
					    </tr>
						`).appendTo('#employment_tbody1')
					}
				// 判断是否招聘中结束
				}
				// 判断是否审核通过结束
			})
		})
	}
//重载数据结束
})