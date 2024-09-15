import React from "react";

const BackgroundUI = () => {
	return (
		<>
			<svg className="fixed top-0 inset-0 z-[1] h-full w-full stroke-[#0048bd21] [mask-image:linear-gradient(90deg,white,transparent_18%,transparent_82%,white)] sm:[mask-image:linear-gradient(90deg,white,transparent_35%,transparent_65%,white)]">
				<rect width="100%" height="100%" fill="url(#grid-1)"></rect>
				<defs>
					<pattern
						id="grid-1"
						width="200"
						height="200"
						x="50%"
						y="-1"
						patternUnits="userSpaceOnUse"
					>
						<path fill="none" d="M.5 200V.5H200"></path>
					</pattern>
				</defs>
			</svg>
		</>
	);
};

export default BackgroundUI;