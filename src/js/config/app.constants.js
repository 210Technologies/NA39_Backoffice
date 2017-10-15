var env = process.env.NODE_ENV || 'develop';
var AppConstants= {}
if (env == 'develop'){
	AppConstants = {
	  api: 'http://localhost:3000/',
	  jwtKey: 'jwtToken',
	  appName: 'Conduit',
	};
}
else{
	AppConstants = {
	  api: 'https://na39api-prod.herokuapp.com',
	  jwtKey: 'jwtToken',
	  appName: 'Conduit',
	};
}


export default AppConstants;
