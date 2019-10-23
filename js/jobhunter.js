$(function(){
	reloadData();
	//详情
	$('#jobhunter_tbody').on('click','.details',function(){
		$('#myModal').modal('show');
		var id = $(this).parents('tr').children().eq(0).find('input').val();
		// console.log(id);
		$.get(baseURL+'/EmploymentJobhunter/findAllWithJobhAndEmpl',function(res){
			res.data.forEach(function(item){
				if(item.jobhunter.id==id){
					$('.name').text(item.jobhunter.realname);
					$('.gender').text(item.jobhunter.gender);
					$('.education').text(item.jobhunter.education);
					$('.birth').text(item.jobhunter.birth);
					$('.workTime').text(item.jobhunter.workTime);
				}
			})
		})
	})
	//详情结束
	//重载数据
	function reloadData(){
		var url = baseURL+"/EmploymentJobhunter/findAllWithJobhAndEmpl";
		//将tbody清空
		$('#jobhunter_tbody').empty();
		$.get(url,function(res){
			// console.log(res);
			res.data.forEach(function(item){
				var newTr = $(`<tr>
					<td><input type="checkbox" value="`+item.jobhunter.id+`" name="#EmploymentJobhunter_id"/></td>
					<td>`+item.jobhunter.realname+`</td>
					<td>`+item.jobhunter.telephone+`</td>
					<td>`+item.employment.job+`</td>
					<td><a href="javascript:void(0)" class="details">查看</a></td>
					<td>`+dateParse(item.askTime)+`</td>
				    </tr>`);
				$('#jobhunter_tbody').append(newTr);
			})
		})
	}
//重载数据结束
})