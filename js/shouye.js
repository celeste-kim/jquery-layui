$(function(){
	reloadData1();
	$('.bussiness').on('click',function(){
		reloadData1();
	})
	//删除
	$('#shouye_tbl').on('click','a',function(event){
		switch(this.className){		
			case 'btn_del':
			//获取当前行的id
			var id = $(this).parents('tr').children().eq(0).find('input').val();
			console.log(id);
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
			console.log(id);
			$('input[name=id]').val(id);
			$('input[name=name]').val($(this).parents('tr').children().eq(1).text());
			$('input[name=industry]').val($(this).parents('tr').children().eq(2).text());
			$('input[name=location]').val($(this).parents('tr').children().eq(3).text());
			$('input[name=contactName]').val($(this).parents('tr').children().eq(4).text());
			$('input[name=contactPhone]').val($(this).parents('tr').children().eq(5).text());		
			break;
			case 'btn_details':
			$('#myModal1').modal('show');
			var id = $(this).parents('tr').children().eq(0).find('input').val();
			console.log(id);
			$('input[name=id]').val(id);
			$('input[name=name]').val($(this).parents('tr').children().eq(1).text());
			$('input[name=industry]').val($(this).parents('tr').children().eq(2).text());
			$('input[name=location]').val($(this).parents('tr').children().eq(3).text());
			$('input[name=contactName]').val($(this).parents('tr').children().eq(4).text());
			$('input[name=contactPhone]').val($(this).parents('tr').children().eq(5).text());		
			$('input[name=scale]').val($(this).parents('tr').children().eq(6).text());		
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
			console.log($('input[name=name]').val());
			var name = $('input[name=name]').val();
			var industry = $('input[name=industry]').val();
			var location = $('input[name=location]').val();
			var contactName = $('input[name=contactName]').val();
			var contactPhone = $('input[name=contactPhone]').val();
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
	//重载商家
	function reloadData1(){
		var url = baseURL+'/Business/findAll';
		$('#shouye_tbody').empty();
		$('#shouye_tbody tr:not(:first)').empty();
			$(`<tr>
			    	<th hidden><input type="text" value="shouye_id" hidden></th>
			        <th scope="col" class="">企业名称</th>
			        <th scope="col">联系人</th>
			        <th scope="col">联系方式</th>
			        <th scope="col">申请时间</th>
			        <th scope="col">详细信息</th>
			        <th scope="col">操作</th>
				</tr>`).appendTo($('#shouye_tbody'))
		$.get(url,function(res){
			res.data.forEach(function(item){
				//判断状态
				if(item.status=='null'){
					$(`
					<tr>
					<td hidden><input type="text" name="id" value="`+item.id+`" hidden></td>
				  	<td>`+item.name+`</td>
				  	<td>`+item.contactName+`</td>
				  	<td>`+item.contactPhone+`</td>
				  	<td>`+dateParse(item.establishedTime)+`</td>
				  	<td>
					    <a class="btn_details" href="javascript:void(0)">查看</a>
					</td>
					<td><button type="button" class="btn btn-sm btn-success pass">通过</button>
					<button type="button" class="btn btn-sm btn-danger refuse" >拒绝</button></td>
				  </tr>
					`).appendTo('#shouye_tbody')
				}
				if(item.status=='审核通过'){
					$(`
					<tr>
					<td hidden><input type="text" name="id" value="`+item.id+`" hidden></td>
				  	<td>`+item.name+`</td>
				  	<td>`+item.contactName+`</td>
				  	<td>`+item.contactPhone+`</td>
				  	<td>`+dateParse(item.establishedTime)+`</td>
				  	<td>
					    <a class="btn_details" href="javascript:void(0)">查看</a>
					</td>
					<td style="color:green;">审核通过</td>
				  </tr>
					`).appendTo('#shouye_tbody')
				}
				if(item.status=='拒绝'){
					$(`
					<tr>
					<td hidden><input type="text" name="id" value="`+item.id+`" hidden></td>
				  	<td>`+item.name+`</td>
				  	<td>`+item.contactName+`</td>
				  	<td>`+item.contactPhone+`</td>
				  	<td>`+dateParse(item.establishedTime)+`</td>
				  	<td>
					    <a class="btn_details" href="javascript:void(0)">查看</a>
					</td>
					<td style="color:red;">已拒绝</td>
				  </tr>
					`).appendTo('#shouye_tbody')
				}
				//判断状态结束
				
			})
		})
	}
	//重载商家结束
	//重载招聘开始
	//重载招聘结束	



})