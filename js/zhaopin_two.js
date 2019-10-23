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
					if(item.status == '招聘完结'){
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
			res.data.forEach(function(item,index){
				if(item.status=='招聘完结'){
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
					if(item.status=='招聘完结'){
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
	//bussinessId传值要注意，有要求
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
					if(item.status=='招聘完结'){
						$(`
						<tr>
					  	<td><input type="checkbox" value=`+item.id+`></td>
					  	<td>`+item.title+`</td>
					  	<td>`+item.contactName+`</td>
					  	<td>`+item.contactPhone+`</td>
					  	<td>`+item.job+`</td>
					  	<td>`+dateParse(item.publishTime)+`</td>
					  	<td><a href="#" class="dec">查看</a></td>
					  	<td>已完结</td>
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