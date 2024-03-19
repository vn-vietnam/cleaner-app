const { gql, default: request } = require("graphql-request");

const MASTER_URL =
	"https://api-ap-northeast-1.hygraph.com/v2/" +
	process.env.NEXT_PUBLIC_MASTER_URL_KEY +
	"/master";

const getCategory = async () => {
	const query = gql`
		query Categories {
			categories {
				id
				name
				icon {
					url
				}
			}
		}
	`;

	const result = await request(MASTER_URL, query);
	return result;
};
const getBussinesses = async () => {
	const query = gql`
		query Bussinesses {
			businesses {
				name
				id
				contactPerson
				address
				about
				email
				image {
					url
				}
				bookings {
					createdAt
					date
					id
					progressStatus
					time
					userEmail
					userName
				}
				categories {
					name
					id
				}
			}
		}
	`;

	const result = await request(MASTER_URL, query);
	return result;
};
const getSingleBusiness = async (id) => {
	const query =
		gql`
	query MyQuery {
		business(where: { id: "` +
		id +
		`" }) {
		  about
		  address
		  contactPerson
		  email
		  id
		  name
		  image {
			url
		  }
		  categories {
			name
		  }
		}
	  }
	  
	`;

	const result = await request(MASTER_URL, query);
	return result;
};
const getBusinessByCategory = async (id) => {
	const query =
		gql`
		query MyQuery {
			businesses(where: { categories_some: { id: "` +
		id +
		`" } }) {
				id
				name
				address
				categories {
					name
					id
				}
				image {
					url
				  }
				email
			}
		}
	`;

	const result = await request(MASTER_URL, query);
	return result;
};

const createNewBooking = async (
	businessId,
	date,
	time,
	userEmail,
	userName
) => {
	const mutationQuery = gql`
		mutation CreateBooking {
			createBooking(
				data: {
					userName: "`+userName+`"
					userEmail: "`+userEmail+`"
					date: "`+date+`"
					time: "`+time+`"
					business: { connect: { id: "`+businessId+`" } }
					progressStatus: book
				}
			) {
				id
			}
			publishManyBookings(to: PUBLISHED) {
				count
			}
			publishManyBusinesses(to: PUBLISHED) {
				count
			}
		}
	`;
	const result = await request(MASTER_URL, mutationQuery);
	return result;
};

const BusinessBookedSlot=async(businessId,date)=>{
	const query=gql`
	query BusinessBookedSlot {
		bookings(where: {business: {id: "`+businessId+`"}, date: "`+date+`"}) {
			id
			userName
			time
			date
		  }
	}
	`
	const result=await request(MASTER_URL,query)
	return result;
  }
  
  const GetUserBookingHistory=async(userEmail)=>{
	const query=gql`
	query GetUserBookingHistory {
		bookings(where: {userEmail: "`+userEmail+`"}, orderBy: publishedAt_DESC) {
			date
			id
			time
			userEmail
			userName
			business {
			  email
			  name
			  id
			  contactPerson
			  address
			  image {
				url
			  }
			}
			progressStatus
		  }
	}
	`
	const result=await request(MASTER_URL,query)
	return result;
  
  }
  
  
  const deleteBooking=async(bookingId)=>{
	const mutationQuery=gql`
	mutation DeleteBooking {
		deleteBooking(where: {id: "`+bookingId+`"}) {
			userName
			userEmail
		  }
	}
	
	
	`
  
	const result=await request(MASTER_URL,mutationQuery)
	return result;
  
  }
  
  const signWithWorker=async(tf,id)=>{
	const mutationQuery=gql`
	mutation signWithWorker {
		updateBusiness(where: {id: "`+id+`"}, data: {isUser: "`+tf+`"}) {
			isUser
		  }
	}
	
	
	`
  
	const result=await request(MASTER_URL,mutationQuery)
	return result;
  
  }
  
  const createNewBussiness=async(name,contact,address,about,email,url,cateId)=>{
	const mutationQuery=gql`
	mutation createNewBussiness {
		createBusiness(
			data: {name: "`+name+`", contactPerson: "`+contact+`", address: "`+address+`", isUser: false, about: "`+about+`", email: "`+email+`", image: {create: {uploadUrl: "`+url+`"}}, categories: {connect: {id: "`+cateId+`"}}}
		  ) {
			email
			name
			address
			contactPerson
			id
		  }

	}
	
	
	`
  
	const result=await request(MASTER_URL,mutationQuery)
	return result;
  
  }
  


export default {
	getCategory,
	getBussinesses,
	getSingleBusiness,
	getBusinessByCategory,
	createNewBooking,
	BusinessBookedSlot,
	GetUserBookingHistory,
	deleteBooking,
	signWithWorker,
	createNewBussiness
};
