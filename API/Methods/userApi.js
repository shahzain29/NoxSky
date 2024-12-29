import { postRequest } from '../api'

export const registrationAPI = payload => postRequest(`/registration`, payload)
export const loginAPI = payload => postRequest('/login', payload)
export const forgotPassAPI = payload => postRequest('/forgot_password', payload)
export const changeEmailAPI = payload => postRequest('/change_email', payload)
export const changePasswordAPI = payload => postRequest('/change_password', payload)
export const postATripAPI = payload => postRequest('/post_trip', payload)
export const findATripAPI = payload  => postRequest('/find_trip',payload)
export const logOutAPI = () => postRequest('/logout')
export const addCommunityAPI = payload => postRequest('/add_community',payload)
export const getUserCommunityAPI =payload => postRequest('/get_user_community',payload)
export const deleteCommunityAPI = payload => postRequest('/delete_community',payload)
export const followUserAPI = payload => postRequest('/follow_user',payload)
export const unfollowUserAPI = payload => postRequest('/Unfollow_user',payload)
export const getConversationAPI = payload => postRequest('/get_conversations', payload)
export const sendMessageAPI = payload => postRequest('/send_message', payload)
export const updateMessageCounterAPI = payload => postRequest('/update_message_counter', payload)
export const getMessagesAPI = payload => postRequest('/get_messages', payload)
export const getMessagesWithoutConversationIdAPI = payload =>postRequest('/get_messages_without_conv_id', payload)
export const editProfileAPI = payload => postRequest('./update_profile',payload)








