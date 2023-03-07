export function isIEBrowser() {
    // BROWSER CHECK VARIABLES
    const ua = window.navigator.userAgent;
    const msie = ua.indexOf('MSIE ');
    const msie11 = ua.indexOf('Trident/');
    // const msedge = ua.indexOf('Edge/');
    return msie > 0 || msie11 > 0;
    // const isEdge = msedge > 0;
}

export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export const stringToColor = (string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
};

export const stringAvatar = (name, imgUrl = '', height = 35, width = 35) => {
    if (imgUrl) {
        return { src: imgUrl };
    } else {
        return {
            sx: {
                bgcolor: stringToColor(name),
                height,
                width
            },
            children: `${name.toUpperCase().split(' ')[0][0]}${name.toUpperCase().split(' ')[1][0]}`
        };
    }
};

export const CreateUserName = (firstName, LastName) => {    
    return firstName + ' ' + LastName;
};
