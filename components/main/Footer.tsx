import React from "react";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

import { FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="w-full h-full bg-transparent  text-gray-200 shadow-lg p-[15px]">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full h-full flex flex-flex-row item-center justify-around flex-wrap">
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="fontbold text-[16px]">Community</div>
            <p className="flex flex-row items-center my-[15px] cusor-pointer">
              <FaYoutube />
              <span className="text-[15px]ml-[6px]">
                <a href="https://youtube.com">Youtube</a>
              </span>
            </p>

            <p className="flex flex-row items-center my-[15px] cusor-pointer">
              <RxGithubLogo />
              <span className="text-[15px]ml-[6px]">
                {" "}
                <a href="https://github.com">Github</a>
              </span>
            </p>
            <p className="flex flex-row items-center my-[15px] cusor-pointer">
              <RxDiscordLogo />
              <span className="text-[15px]ml-[6px]">
                <a href="https://discord.com">Discord</a>
              </span>
            </p>
          </div>
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="fontbold text-[16px]">Social Media</div>
            <p className="flex flex-row items-center my-[15px] cusor-pointer">
              <RxInstagramLogo />
              <span className="text-[15px]ml-[6px]">
                {" "}
                <a href="https://instagram.com">Instagram</a>
              </span>
            </p>

            <p className="flex flex-row items-center my-[15px] cusor-pointer">
              <RxTwitterLogo />
              <span className="text-[15px]ml-[6px]">
                <a href="https://twitter.com">Twitter</a>
              </span>
            </p>
            <p className="flex flex-row items-center my-[15px] cusor-pointer">
              <RxLinkedinLogo />
              <span className="text-[15px]ml-[6px]">
                {" "}
                <a href="https://linkedIn.com">LinkedIn</a>
              </span>
            </p>
          </div>
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="fontbold text-[16px]">About</div>
            <p className="flex flex-row items-center my-[15px] cusor-pointer">
              <span className="text-[15px]ml-[6px]">Become Sponsor</span>
            </p>

            <p className="flex flex-row items-center my-[15px] cusor-pointer">
              <span className="text-[15px]ml-[6px]">Learn about courses </span>
            </p>
            <p className="flex flex-row items-center my-[15px] cusor-pointer">
              <span className="text-[15px]ml-[6px]">
                shubhamsingh@gmail.com
              </span>
            </p>
          </div>
        </div>
        <div className="mb-[20px] text-[15px] text-center">
          &Copy; LearnMate 2024 Inc. All rights reserved!
        </div>
      </div>
    </div>
  );
};
