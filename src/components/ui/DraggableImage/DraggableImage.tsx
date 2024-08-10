"use client";

import { useRef, Fragment, CSSProperties } from "react";
import { motion } from "framer-motion";

import styles from "./styles.module.css";

const DraggableImage = ({
  src,
  scale = 1,
}: {
  src: string;
  scale?: number;
}) => {
  const constraintsRef = useRef(null);

  return (
    <Fragment>
      <motion.div className={styles.dragArea} ref={constraintsRef} />
      <motion.div
        className={styles.dragImage}
        style={
          {
            "--scale": scale,
            "--background-url": `url(${src})`,
          } as CSSProperties
        }
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        dragMomentum={false}
      />
    </Fragment>
  );
};

export default DraggableImage;
