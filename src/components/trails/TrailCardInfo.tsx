import React from "react";
import OpenStatus from "../OpenStatus";
import InformativeText from "../InformativeText";
import Scrollable from "../Scrollable";
import { motion } from "framer-motion";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

export type TrailCardInfoProps = {
  title: string;
  text: string;
  openTime: string;
  closeTime: string;
  openHoursText: string;
  trailSize: string;
  location: string;
  navigateTo: string;
};

function TrailCardInfo({
  title,
  text,
  openTime,
  closeTime,
  openHoursText,
  location,
  navigateTo,
  trailSize,
}: TrailCardInfoProps) {
  const infos = [
    {
      icon: "location.svg",
      text: location,
    },
    {
      icon: <OpenStatus openTime={openTime} closeTime={closeTime} />,
      text: openHoursText,
    },
    {
      icon: "trending-up.svg",
      text: trailSize,
    },
  ];

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.8, once: false }}
      className="font-segoe  font-semibold flex flex-col "
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 max-w-[400px]">
          <h1 className="text-4xl text-gray-100 ">{title}</h1>
          <Scrollable height={60}>
            <p className="text-sm text-gray-300">{text}</p>
          </Scrollable>
        </div>

        <div className="flex flex-wrap max-w-[300px] gap-3">
          {infos.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              exit={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.5, once: false }}
              transition={{
                delay: index * 0.1,
                ease: "easeIn",
              }}
            >
              <InformativeText icon={info.icon} text={info.text} />
            </motion.div>
          ))}
        </div>
        <div className="flex self-end">
          <Button
            onClick={() => navigate(navigateTo)}
            icon={
              <img
                src="arrow-up-right.svg"
                className="group-hover:invert-50 group-hover:grayscale-25"
              />
            }
            variant="contrast"
            size="sm"
          >
            Saiba mais
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default TrailCardInfo;
