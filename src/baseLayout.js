import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";

import { CardSimple } from "./card";
import BotUi from "./botUI";
export default function BaseLayout() {
  const [open, setOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState({});

  const [grade, setGrade] = useState("");
  const [subject, setsubject] = useState("");

  return (
    <>
      <div className="flex justify-start p-2 m-2">
        <div className="flex w-72 flex-row gap-6">
          <Input
            color="blue"
            label="Grade"
            onChange={(e) => {
              setGrade(e.target.value);
            }}
          />
          <Input
            color="purple"
            label="subject"
            onChange={(e) => {
              setsubject(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="">
        <div className="flex flex-row flex-wrap justify-center ">
          <CardSimple
            title={"Unit Plan"}
            bodyText={"detailed plan on the subject"}
            btnClick={() => {
              setOpen(true);
              setCurrentTopic({
                topic: "unit-plan",
                grade: grade,
                subject: subject,
              });
            }}
          />
          <CardSimple
            title={"Quizzes"}
            bodyText={" sample quiz questions"}
            btnClick={() => {
              setOpen(true);
              setCurrentTopic({
                topic: "quiz",
                grade: grade,
                subject: subject,
              });
            }}
          />
          <CardSimple
            title={"Assess yourself"}
            bodyText={" sample study plans"}
            btnClick={() => {
              setOpen(true);
              setCurrentTopic({
                topic: "assess-yourself",
                grade: grade,
                subject: subject,
              });
            }}
          />
          <CardSimple
            title={"Doubts"}
            bodyText={" sample study plans"}
            btnClick={() => {
              setOpen(true);
              setCurrentTopic({
                topic: "doubts",
                grade: grade,
                subject: subject,
              });
            }}
          />
          <CardSimple
            title={"Feedback"}
            bodyText={" sample study plans"}
            btnClick={() => {
              setOpen(true);
              setCurrentTopic("feedback");
            }}
          />
          <CardSimple
            title={"Saved"}
            bodyText={"Saved plans"}
            btnClick={() => {
              setOpen(true);
              setCurrentTopic("saved");
            }}
          />
        </div>
      </div>
      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="false"
        data-state="closed"
        onClick={() => {
          setOpen(true);
        }}
      >
        <svg
          xmlns=" http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle"
        >
          <path
            d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"
            className="border-gray-200"
          ></path>
        </svg>
      </button>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Panel title
                        </Dialog.Title>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Your content */}
                        <BotUi topicData={currentTopic} />
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
