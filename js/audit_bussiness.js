$(function(){
	reloadData();
	var data;	
	//监听select one
	$('#one').change(function(){
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
	//点击详情
	$('#business_tbl').on('click','.btn_details',function(event){
		//使详情模态框显示
		$('#myModal1').modal('show');
		var id = $(this).parents('tr').children().eq(0).find('input').val();
		var obj ={
			id:id
		}
		console.log(id);
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
	})
	//点击详情结束
	//点击通过
	$('#business_tbody').on('click','button.pass',function(){
		//获取id

		var id = $(this).parents('tr').children().eq(0).find('input').val();
		// console.log(id);
		var data ={
			id:id
		}
		$('#business_tbody').empty();
		var url = baseURL+'/Business/findById';
		$.get(url,data,function(res){
			console.log(res.data.status)
			res.data.status ='审核通过';
			console.log(res.data.status)
			// res.data.id =id;
			var data1 =res.data;
			$.post(baseURL+'/Business/saveOrUpdate',data1,function(response){
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
	$('#business_tbody').on('click','button.refuse',function(){
		//获取id
		var id = $(this).parents('tr').children().eq(0).find('input').val();
		console.log(id);
		var data ={
			id:id
		}
		$('#business_tbody').empty();
		var url = baseURL+'/Business/findById';
		$.get(url,data,function(res){
			console.log(res.data.status);
			res.data.status ='拒绝';
			var data2 =res.data;
			$.post(baseURL+'/Business/saveOrUpdate',data2,function(response){
				if(response.status === 200){
					message('修改成功！');
					reloadData();
				}else{
					message('修改失败！');
				}
			})
		})
		
	})
	//加载数据
	function reloadData(){
		var url = baseURL+"/Business/findAll";
		//将tbody清空
		$('#business_tbody').empty();
		$.get(url,function(res){		
			//追加新的值
			data = res.data;
			res.data.forEach(
				function(item){
				//判断
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
					     	<td style="color:green;">审核通过</td>
					    </tr>`);
						$("#business_tbody").append(newTr);
					}else if(item.status=='拒绝'){
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
					     	<td style="color:red;">已拒绝</td>
					    </tr>`);
						$("#business_tbody").append(newTr);
					}else{
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
					     	<td><button type="button" class="btn btn-sm btn-success pass">通过</button>
							<button type="button" class="btn btn-sm btn-danger refuse" >拒绝</button></td>
					    </tr>`);
						$("#business_tbody").append(newTr);
					}
				//判断结束	
			})
		})
	}
	//加载数据结束
	//加载页面option
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
					arr1.push(item.industry)
				}	
			})
			arr1 = uniq(arr1)
			arr1.forEach(function(item){
				$('<option value='+item+'>'+item+'</option>').appendTo('#one')
			})
		})
	}
	addoption()
	//加载页面option结束
})