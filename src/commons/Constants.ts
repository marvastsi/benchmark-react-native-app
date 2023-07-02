export const LENGTH_SHORT = 1000;
export const LENGTH_MEDIUM = 3000;
export const LENGTH_LONG = 5000;

export const sleep = async (millis: number = LENGTH_MEDIUM) => {
    return new Promise((resolve) =>
        setTimeout(
            () => { resolve("result") },
            millis
        )
    );
};
