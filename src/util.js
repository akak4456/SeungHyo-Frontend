export function timeAgo(dateString) {
	const now = new Date();
	const past = new Date(dateString);
	const diffInSeconds = Math.floor((now - past) / 1000);

	const secondsInMinute = 60;
	const secondsInHour = 60 * 60;
	const secondsInDay = 60 * 60 * 24;

	if (diffInSeconds < secondsInMinute) {
		return `${diffInSeconds}초전`;
	} else if (diffInSeconds < secondsInHour) {
		const minutes = Math.floor(diffInSeconds / secondsInMinute);
		return `${minutes}분전`;
	} else if (diffInSeconds < secondsInDay) {
		const hours = Math.floor(diffInSeconds / secondsInHour);
		return `${hours}시간전`;
	} else {
		const days = Math.floor(diffInSeconds / secondsInDay);
		return `${days}일전`;
	}
}
