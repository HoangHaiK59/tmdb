import axios from './axios';
import { useState, useEffect, useRef } from 'react';
const querystring = require('querystring');

const useFetch = (url, options) => {
    const abortCurrentRef = useRef();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        abortCurrentRef.current = new AbortController();
    });

    useEffect(() => {
        const handleUpdate = () => {
            axios
                .get(url, options)
                .then(response => {
                    console.log(response.data);
                    if (response) {
                        setLoading(false);
                        setData(response.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (error) {
                        setError(error);
                    }
                });
        };
        handleUpdate();
        return () => abortCurrentRef.current.abort();
    }, [url, options]);
    return [loading, data, error];
};

const useUpdateBackdrop = (url) => {
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        if(url) {
            setIsSuccess(true);
            document.body.style.backgroundImage = 'url('+ url +')';
        }
    }, [url])
    return isSuccess;
}

const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    })

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };

        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
};

let Formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
})

const buildQuery = (url,path,params) => {
    if(params === undefined)
        return url + path;
    else {
        return url + path + '?' + querystring.stringify(params)
    }
}

const usePost = (url, body) => {
    const abortCurrentRef = useRef();
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        abortCurrentRef.current = new AbortController();
    });

    useEffect(() => {
        const handleProcess = () => {
            axios
                .post(url, ...body)
                .then(response => {
                    console.log(response.data);
                    if (response) {
                        setIsSuccess(true);
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (error) {
                        setError(error);
                    }
                });
        };
        handleProcess();
        return () => abortCurrentRef.current.abort();
    }, [url, body]);
    return [isSuccess, error];
}

const useVisible = (initVisible) => {
    const [visible, setVisible] = useState(initVisible);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && ref.current.contains(event.target)) {
            setVisible(true);
        }else {
            setVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })

    return { ref, visible, setVisible };
}

const useFetching = (url, count) => {
    const abortCurrentRef = useRef();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        abortCurrentRef.current = new AbortController();
    });

    useEffect(() => {
        const handleUpdate = () => {
            axios
                .get(url)
                .then(response => {
                    console.log(response.data);
                    if (response) {
                        setLoading(false);
                        setData(response.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (error) {
                        setError(error);
                    }
                });
        };
        handleUpdate();
        return () => abortCurrentRef.current.abort();
    }, [url, count]);
    return [loading, data, error];
};

const helper = { 
    useFetch, 
    useUpdateBackdrop,
    useInterval,
    useVisible,
    Formatter,
    buildQuery,
    usePost,
    useFetching
};

export default helper;


