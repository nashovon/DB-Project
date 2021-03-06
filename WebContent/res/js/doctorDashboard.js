var app = angular.module("dashboardApp",["ngRoute"]);
app.controller("doctorDashboardController",function($scope,$rootScope,$http,$timeout,$location,$anchorScroll,$routeParams){
	this.myDate = new Date();
	this.isOpen = false;
	$scope.isUpdate = false;
	$scope.isUpdated = false;
	
	/*method to update doctor detail using ajax 
	 * */
	$scope.updateFormSubmit = function(){
		alert($scope.firstName);
		$http({
			method:"POST",
			url:"updatedoctordetail?firstName="+$scope.firstName+"&lastName="+$scope.lastName
			+"&password="+$scope.password+"&address="+$scope.address
			+"&chamber="+$scope.chamber+"&degree="+$scope.degree+"&fieldOfTreatment="+$scope.fieldOfTreatment
			+"&contactNo="+$scope.contactNo+"&id="+$scope.id
			
			}).then(function(response){
				if(response.data.trim()=="true")
				{
//					$scope.isRegistered = true;
//					$timeout(function(){
//						//alert("Now redirect");
//						window.location.replace("./doctordashboard?isNew=1&email="+$scope.email);
//					},2000);
					console.log("Success : "+response.data);
				}				
				
			},
				function(error)
				{
					console.log(error);
				}
			)	
	}
	
	
	/*method to get doctor detail information using ajax 
	 * */
	$scope.getDoctor = function(id){
		
		$http({
			method:"GET",
			url:"getdoctordetail?id="+id
		}).then(function(response){
			$scope.doctorDetail = response.data;
			console.log(response.data);
		})
	}
	
	
	/*method to update doctor detail information using ajax
	 * */
	$scope.updateDoctorInfo = function(doctor,id){
		var firstName = doctor.firstName;
		var lastName = doctor.lastName;
		var email = doctor.email;
		var password = doctor.password;
		var address = doctor.address;
		var degree = doctor.degree;
		var fieldOfTreatment = doctor.fieldOfTreatment;
		var chamber = doctor.chamber;
		var contact = doctor.contact;		
		$http({
			method:"POST",
			url:"updatedoctordetail?id="+id+"&firstName="+firstName+"&lastName="+lastName+"" +
					"&password="+password+"&address="+address+"&degree="+degree+"" +
					"&fieldOfTreatment="+fieldOfTreatment+"&contactNo="+contact+"" +
							"&chamber="+chamber+""
			
		}).then(function(response){
			console.log(response.data);
			if(response.data.trim()=="true")
			{
				$scope.isUpdated = true;
				window.location.href = "#!doctordashboard/updated"
				
			}
		})
	}
	
	/*method to scroll up 
	 * */
	
	$scope.scrollTo = function(scrollLocation){
		$location.hash(scrollLocation);
		$anchorScroll();
	}
	
	
	
	/*
	 * method to get available clinic
	 * */
	
	$scope.getClinic = function(id){
		$scope.noClinicFoundForDoctor = false;
		$http({
			method:"GET",
			url:"getdoctorclinic?id="+id
		}).then(function(response){
			console.log(response.data);
			var isObject = angular.isObject(response.data)
			if(isObject)
			{
				$scope.clinicForDoctor = response.data;
			}
			else 
			{
				if(response.data.trim()=="0")
				{
					$scope.noClinicFoundForDoctor = true;
					$scope.clinicForDoctor = null;
					
				}
				
			}
			
		})
		
	}
	
	/*
	 * DayList
	 * */
	$scope.days = ["Saturday","Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday"];
	
	/*
	 * method to add doctor clinic
	 * */
	;
	$scope.addDoctorClinic = function(id,doctor){
		var name = doctor.clinicName;
		var address = doctor.clinicAddress;
		$http({
			method:"POST",
			url:"adddoctorclinic?id="+id+"&name="+name+"&address="+address
		}).then(function(response){
			console.log(response.data);
			if(response.data.trim()=="1")
			{
				$rootScope.clinicAdded = true;
				window.location.href="#!adddoctorclinic";
				$timeout(function(){
					//alert("Will hide");
					$rootScope.clinicAdded = false;
				},3000)
				
			}
		})
	}
	
	/*
	 * method to add schedule
	 * */
	
	
	$scope.addDoctorSchedule = function(id,schedule){
		var doctorId = id;
		var clinicId = schedule.clinicId;
		var day = schedule.day;
		var startHour = schedule.startHour;
		var endHour = schedule.endHour;
		//alert(clinicId+day+startHour+endHour);
		$http({
			method:"POST",
			url:"adddoctorschedule?clinicId="+clinicId+"&doctorId="+doctorId
			+"&day="+day+"&startHour="+startHour+"&endHour="+endHour
		}).then(function(response){
			console.log(response.data);
			if(response.data.trim()=="1")
			{
				$rootScope.doctorScheduleAdded = true;
				window.location.href="#!visitingschedule"
				$timeout(function(){
					//alert("Will hide");
					$rootScope.doctorScheduleAdded = false;
				},3000)

			}
		})
	}
	
	/*
	 * method to get doctor schedule
	 * */
	
	$scope.getDoctorSchedule = function(id){

		$scope.noScheduleFoundForDoctor = false;
		var schedule;
		$http({
			method:"GET",
			url:"getdoctorschedule?id="+id,
			
		}).then(function(response){
			var isObject = angular.isObject(response.data)
			if(isObject)
			{
				$scope.scheduleForDoctor = response.data;
				
			}
			else 
			{
				if(response.data.trim()=="0")
				{
					$scope.noScheduleFoundForDoctor = true;	
					$scope.scheduleForDoctor = null;
					
				}
				
			}
		})
		
	}
	
	/*
	 * method to get single schedule
	 * */
	$scope.getSingleSchedule = function(scheduleId,doctorId){
		//var id = $routeParams.id;
		//alert(scheduleId+" dc "+doctorId);
		$http({
			method:"GET",
			url:"getsingleschedule?scheduleId="+scheduleId+"&doctorId="+doctorId
		}).then(function(response){
			console.log(response.data);
			$rootScope.singleSchedule = response.data;
			
		})
		
	}
	
		
	/*
	 * method to update schedule
	 * */
	$scope.updateSchedule = function(singleSchedule){
		var scheduleId = singleSchedule.scheduleId;
		var clinicId = singleSchedule.clinicId;
		var day = singleSchedule.day;
		var startHour = singleSchedule.startHour;
		var endHour = singleSchedule.endHour;
		
		$http({
			method:"POST",
			url:"updatesingleschedule?scheduleId="+scheduleId+
			"&clinicId="+clinicId+"&day="+day+"&startHour="+startHour+
			"&endHour="+endHour
			
		}).then(function(response){
			console.log(response.data);
			if(response.data.trim()=="true")
			{
				$rootScope.isScheduleUpdated = true;				
				window.location.href = "#!visitingschedule";
				$timeout(function(){
					//alert("Will hide");
					$rootScope.isScheduleUpdated = false;
				},3000)

					
				
			}
		})
	}
	$scope.scheduleIdToDelete = -1;
	$scope.passScheduleId = function(id){		
		$rootScope.scheduleIdToDelete=id;
	}
	
	$scope.deleteSchedule = function(){
		var id = $rootScope.scheduleIdToDelete;
		$http({
			method:"POST",
			url:"deletesingleschedule?scheduleId="+id
			
		}).then(function(response){
			console.log(response.data);
			if(response.data.trim()=="true")
			{
				
				$rootScope.isScheduleDeleted = true;				
				window.location.href = "#!visitingschedule";
				$timeout(function(){
					//alert("Will hide");
					$rootScope.isScheduleDeleted = false;
				},3000)
			}
		})		
	}
	
	
	$scope.clinicIdToDelete = -1;
	$scope.passClinicId = function(id){		
		$rootScope.clinicIdToDelete=id;
	}
	
	$scope.deleteClinic = function(){
		var id = $rootScope.clinicIdToDelete;
		//alert(id);
		$http({
			method:"POST",
			url:"deletedoctorclinic?clinicId="+id
			
		}).then(function(response){
			console.log(response.data);
			if(response.data.trim()=="true" || response.data.trim()=="true2")
			{
				
				$rootScope.isClinicDeleted = true;				
				window.location.href = "#!managedoctorclinic";
				$timeout(function(){
					//alert("Will hide");
					$rootScope.isClinicDeleted = false;
				},3000)
			}
		})		
	}
	
	
	$scope.getDateForUpcomingSchedule = function(id){
		//$scope.getDoctorSchedule(id);
		//alert("func2");
		console.log("ans is "+$rootScope.bal);
		var days = ["Sunday","Monday","Tuesday","Wedensday",
			"Thrusday","Friday","Saturday"];
		var months = ["January","February","March","April",
			"May","June","July","August","September","October",
			"November","December"];		
		var fullDate = new Date();
		var currentFullDate = new Date();
		var currentDate = currentFullDate.getDate();
		var currentYear = currentFullDate.getFullYear();
		var currentMonth = currentFullDate.getMonth();
		var lastFullDate = new Date("31 December,"+currentYear); 
		console.log(currentFullDate);
		console.log(lastFullDate);
		$scope.date = fullDate.getDate();
		$scope.day = days[fullDate.getDay()];
		$scope.month = fullDate.getMonth();
		$scope.year = fullDate.getFullYear();
		
		var dateArray = new Array();
		for(var imonth=currentMonth;imonth<12;imonth++)
		{
			var startDate=-1;
			if(imonth==currentMonth)
				startDate = currentDate;
			else startDate = 1;
			for(var idate=startDate;idate<=31;idate++)
			{
				
				var nextFullDate = new Date(idate+" "+months[imonth]+ ",2017");
				var date = nextFullDate.getDate();
				var day = days[nextFullDate.getDay()];
				var month = months[nextFullDate.getMonth()];
				var year = nextFullDate.getFullYear();
				var dateObject = {"date":date,"day":day,"month":month,
						"year":year};
				dateArray.push(dateObject);
			}
		}
		$scope.upcomingDateArray = dateArray;
//		 
		
	}
	
	
	
});

/*angular js routing configuration
 * */
app.config(function($routeProvider){
	$routeProvider
	.when("/",{
		templateUrl:"template/doctor_dashboard.jsp"
	})
	.when("/account",{
		templateUrl:"template/doctor_account.jsp"
	})
	.when("/visitingschedule",{
		templateUrl:"template/doctor_visiting_schedule.jsp"
	})
	.when("/addvisitingschedule",{
		templateUrl:"template/add_doctor_visiting_schedule.jsp"
	})
	.when("/updatevisitingschedule",{
		templateUrl:"template/update_doctor_visiting_schedule.jsp"
	})
	.when("/adddoctorclinic",{
		templateUrl:"template/add_doctor_clinic.jsp"
	})	
	.when("/upcomingschedule",{
		templateUrl:"template/doctor_upcoming_schedule.jsp"
	})
	.when("/notification",{
		templateUrl:"template/doctor_notification.jsp"
	})
	.when("/managedoctorclinic",{
		templateUrl:"template/manage_doctor_clinic.jsp"
	})
	.when("/doctordashboard/updated",{
		templateUrl:"template/doctor_account.jsp"
	})
	.when("/update",{
		templateUrl:"template/update_doctor_profile.jsp"
	})
	.when("/upload",{
		templateUrl:"template/upload.jsp"
	})	
});
