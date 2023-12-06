
import { useEffect } from "react"

const useTitle = (title) => {
    useEffect(() => {
        document.title = `Second Lit- ${title}`
    }, [title])
}

export default useTitle;
