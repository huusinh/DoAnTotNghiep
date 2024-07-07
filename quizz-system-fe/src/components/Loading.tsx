import { useEffect, useMemo } from "react";
import { useLottie } from "lottie-react";
import LoadingAnimation from "@main/lottie/loading.json";
import { useAppSelector } from "@redux/hooks";
import { selectLoadingState } from "@redux/slices/loading.slice";
import "@main/styles/loading.css";
  
const options = {
  animationData: LoadingAnimation,
  loop: true
};

export const Loading = () => {
  const isOpen = useAppSelector(selectLoadingState)

  const { View, animationItem } = useLottie(options);

  const style = useMemo(() => {
    if (!isOpen) {
      return {
        display: 'none'
      }
    }

    return undefined
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      animationItem?.play()
    } else {
      animationItem?.pause()
    }
  }, [isOpen, animationItem])

  useEffect(() => {
    return () => {
      animationItem?.destroy()
    }
  }, [animationItem])
  
  return <div style={style} className="loading-container">{View}</div>;
};