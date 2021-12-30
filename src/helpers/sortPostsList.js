export const sortPostsList = ( postsList ) => {
	postsList.sort((a, b) => {
			if (a.date.seconds < b.date.seconds) {
				return 1;
			}
			if (a.date.seconds > b.date.seconds) {
				return -1;
			}
			return 0;
		});
}

